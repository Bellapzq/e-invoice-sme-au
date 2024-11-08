const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../config/dbConfig'); // Adjust path if necessary
const verifyToken = require('../authMiddleware');

router.get('/new', verifyToken, async (req, res) => {
    const userId = req.userId;

    try {
        let pool = await sql.connect(dbConfig);

        // Check for pending connections where the user is the receiver
        const pendingConnectionsResult = await pool.request()
            .input('UserId', sql.Int, userId)
            .query(`
                SELECT COUNT(*) AS pendingConnectionsCount
                FROM Relationships
                WHERE ReceiverID = @UserId AND Status = 'Pending'
            `);

        const pendingConnections = pendingConnectionsResult.recordset[0].pendingConnectionsCount;

        // Check for unread documents where the user is the receiver
        const unreadDocumentsResult = await pool.request()
            .input('UserId', sql.Int, userId)
            .query(`
                SELECT COUNT(*) AS unreadDocumentsCount
                FROM Document
                WHERE ReceiverID = @UserId AND Status = 'Unread'
            `);

        const unreadDocuments = unreadDocumentsResult.recordset[0].unreadDocumentsCount;

        res.json({
            hasPendingConnections: pendingConnections > 0,
            hasUnreadDocuments: unreadDocuments > 0,
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: 'Failed to fetch notifications', error });
    }
});

module.exports = router;
