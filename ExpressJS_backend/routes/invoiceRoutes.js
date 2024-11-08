const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');  // database set up
const verifyToken = require('../authMiddleware'); 

// get the invoices I received
router.get('/receive', verifyToken, async (req, res) => {
    const userId = req.userId; // 从 token 中获取的 receiver ID

    try {
        let pool = await sql.connect(dbConfig);

        const documentsResult = await pool.request()
            .input('ReceiverID', sql.Int, userId)
            .query(`
                SELECT
                  DocumentID,
                  DocumentName,
                  Status,
                  Timestamp,
                  u.email AS SenderEmail
                FROM
                  Document d
                JOIN
                  user_info u ON d.SenderID = u.user_id
                WHERE
                  d.ReceiverID = @ReceiverID AND if_send = 1
                ORDER BY
                  Timestamp DESC
              `);

        const documents = documentsResult.recordset;
        
        res.json(documents);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ message: 'Failed to fetch documents', error });
    }
});

// get the invoices I created
router.get('/created', verifyToken, async (req, res) => {
    const userId = req.userId; // 从 token 中获取的 receiver ID

    try {
        let pool = await sql.connect(dbConfig);

        const documentsResult = await pool.request()
            .input('ReceiverID', sql.Int, userId)
            .query(`
                SELECT
                  DocumentID,
                  DocumentName,
                  if_send,
                  Timestamp,
                  u.email AS SenderEmail
                FROM
                  Document d
                JOIN
                  user_info u ON d.ReceiverID = u.user_id
                ORDER BY
                  Timestamp DESC
              `);

        const documents = documentsResult.recordset;
        res.json(documents);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ message: 'Failed to fetch documents', error });
    }
});

// 在你的 Express 路由文件中
router.put('/send/:documentName', verifyToken, async (req, res) => {
    const documentName = req.params.documentName;

    try {
        const pool = await sql.connect(dbConfig);
        
        // 更新if_send字段为1
        await pool.request()
            .input("DocumentName", sql.NVarChar, documentName)
            .query(`UPDATE Document SET if_send = 1 WHERE DocumentName = @DocumentName AND if_send = 0`);

        res.status(200).json({ message: 'Document sent successfully' });
    } catch (error) {
        console.error("Error updating document send status:", error);
        res.status(500).json({ message: 'Failed to send document', error });
    }
});


// download document
router.get("/download/:documentName", async (req, res) => {
    const documentName = req.params.documentName;

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input("DocumentName", sql.NVarChar, documentName)
            .query("SELECT DocumentContent, DocumentName FROM Document WHERE DocumentName = @DocumentName");

        if (result.recordset.length > 0) {
            const document = result.recordset[0];
            const fileBuffer = document.DocumentContent;
            const fileName = document.DocumentName;

            res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
            res.setHeader("Content-Type", "application/pdf");
            res.send(fileBuffer);
        } else {
            res.status(404).send("Document not found");
        }
    } catch (err) {
        console.error("Error retrieving document:", err);
        res.status(500).send("Error retrieving document");
    }
});

// preview document
router.get("/preview/:documentName", async (req, res) => {
    const documentName = req.params.documentName;

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input("DocumentName", sql.NVarChar, documentName)
            .query("SELECT DocumentContent FROM Document WHERE DocumentName = @DocumentName");

        if (result.recordset.length > 0) {
            const document = result.recordset[0];
            const fileBuffer = document.DocumentContent;

            res.setHeader("Content-Type", "application/pdf");
            res.send(fileBuffer);
        } else {
            res.status(404).send("Document not found");
        }
    } catch (err) {
        console.error("Error retrieving document:", err);
        res.status(500).send("Error retrieving document");
    }
});

router.put("/updateStatus/:documentName", async (req, res) => {
    const documentName = req.params.documentName;
    try {
      const pool = await sql.connect(dbConfig);
      await pool.request()
        .input("DocumentName", sql.NVarChar, documentName)
        .query("UPDATE Document SET Status = 'Read' WHERE DocumentName = @DocumentName");
  
      res.status(200).json({ message: "Document status updated to Read" });
    } catch (error) {
      console.error("Error updating document status:", error);
      res.status(500).json({ message: "Failed to update document status", error });
    }
});
  
module.exports = router;
