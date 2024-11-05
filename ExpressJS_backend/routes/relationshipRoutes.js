const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');  // database set up
const secretKey = process.env.SECRET_KEY;
console.log("SECRET_KEY:", secretKey); // Print SECRET_KEY value
const verifyToken = require('../authMiddleware'); 

// post connection request
// frontend: sendConnection.js
router.post('/request', verifyToken, async (req, res) => {
    const { receiverEmail } = req.body; // Receive the target user's mailbox
    const requesterId = req.userId; // Get the requester's ID from the authentication middleware

    try {
        let pool = await sql.connect(dbConfig);

        // Query the user_info table to get the recipient's user ID
        const receiverResult = await pool.request()
            .input('Email', sql.NVarChar, receiverEmail)
            .query("SELECT user_id FROM user_info WHERE email = @Email");

        if (receiverResult.recordset.length === 0) {
            return res.status(404).json({ message: "User with this email not found" });
        }

        const receiverId = receiverResult.recordset[0].user_id;

        // Inserts a related request record, with the initial status being 'Pending'
        await pool.request()
            .input('RequesterID', sql.Int, requesterId)
            .input('ReceiverID', sql.Int, receiverId)
            .input('Status', sql.NVarChar, 'Pending')
            .query("INSERT INTO Relationships (RequesterID, ReceiverID, Status) VALUES (@RequesterID, @ReceiverID, @Status)");

        res.status(201).json({ message: "Relationship request sent" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send relationship request", error });
    }
});

// get all the request information
// frontend: PendingRequests.js
router.get('/pending', verifyToken, async (req, res) => {
    const userId = req.userId;

    try {
        let pool = await sql.connect(dbConfig);

        const pendingRequests = await pool.request()
            .input('ReceiverID', sql.Int, userId)
            .query(`
                SELECT r.RelationshipID, r.RequesterID, r.Status, r.RequestDate, u.email AS RequesterEmail
                FROM Relationships r
                JOIN user_info u ON r.RequesterID = u.user_id
                WHERE r.ReceiverID = @ReceiverID AND r.Status = 'Pending'
            `);

        res.json(pendingRequests.recordset);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve pending requests", error });
    }
});

// Accept link request
// frontend: PendingRequests.js
router.put('/accept/:id', verifyToken, async (req, res) => {
    const relationshipId = req.params.id;

    try {
        let pool = await sql.connect(dbConfig);

        // Update the association status to 'Confirmed'
        await pool.request()
            .input('RelationshipID', sql.Int, relationshipId)
            .query("UPDATE Relationships SET Status = 'Confirmed' WHERE RelationshipID = @RelationshipID");

        res.json({ message: "Relationship confirmed" });
    } catch (error) {
        res.status(500).json({ message: "Failed to confirm relationship", error });
    }
});

// Reject link request
// frontend: PendingRequests.js
router.put('/reject/:id', verifyToken, async (req, res) => {
    const relationshipId = req.params.id;

    try {
        let pool = await sql.connect(dbConfig);

        // Update the association status to 'Rejected'
        await pool.request()
            .input('RelationshipID', sql.Int, relationshipId)
            .query("UPDATE Relationships SET Status = 'Rejected' WHERE RelationshipID = @RelationshipID");

        res.json({ message: "Relationship rejected" });
    } catch (error) {
        res.status(500).json({ message: "Failed to reject relationship", error });
    }
});

// Get all confirmed company information
// frontend: PartnerCompanies.js
router.get('/partners', verifyToken, async (req, res) => {
    const userId = req.userId;

    try {
        let pool = await sql.connect(dbConfig);

        const partners = await pool.request()
            .input('UserID', sql.Int, userId)
            .query(`
                SELECT r.RelationshipID, u.user_id, u.company_name, u.email, u.phone_number
                FROM Relationships r
                JOIN user_info u ON 
                    (u.user_id = r.RequesterID AND r.ReceiverID = @UserID) 
                    OR (u.user_id = r.ReceiverID AND r.RequesterID = @UserID)
                WHERE r.Status = 'Confirmed'
            `);
        console.log(partners.recordset);
        res.json(partners.recordset);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve partner information", error });
    }
});


// Get company information of related customers (only in confirmed state)
// To Glofy
router.get('/partner-info/:partnerId', verifyToken, async (req, res) => {
    const userId = req.userId; // The ID of the current user
    const partnerId = req.params.partnerId; // ID of the target user (related party)

    try {
        let pool = await sql.connect(dbConfig);

        // 检查用户之间的关联状态
        const relationshipResult = await pool.request()
            .input('UserID', sql.Int, userId)
            .input('PartnerID', sql.Int, partnerId)
            .query(`
                SELECT Status
                FROM Relationships
                WHERE (RequesterID = @UserID AND ReceiverID = @PartnerID)
                   OR (RequesterID = @PartnerID AND ReceiverID = @UserID)
            `);

        if (relationshipResult.recordset.length === 0) {
            return res.status(404).json({ message: "No relationship found between the users" });
        }

        const relationshipStatus = relationshipResult.recordset[0].Status;

        // Return company information only if the association status is Confirmed
        if (relationshipStatus !== 'Confirmed') {
            return res.status(403).json({ message: "Access denied: Relationship not confirmed" });
        }

        // Obtaining company information of related parties
        const partnerInfoResult = await pool.request()
            .input('PartnerID', sql.Int, partnerId)
            .query(`
                SELECT company_name, address, phone_number
                FROM user_info
                WHERE user_id = @PartnerID
            `);

        if (partnerInfoResult.recordset.length === 0) {
            return res.status(404).json({ message: "Partner company information not found" });
        }

        // Back to company information
        res.json(partnerInfoResult.recordset[0]);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve partner information", error });
    }
});


module.exports = router;