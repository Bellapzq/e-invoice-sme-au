const express = require("express");
const multer = require("multer");
const sql = require("mssql");
const dbConfig = require("../config/dbConfig");

const router = express.Router();
const upload = multer();

// File upload routing
router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const fileName = file.originalname;
  const fileData = file.buffer;  // Binary data of the file

  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input("DocumentName", sql.NVarChar, fileName)
      .input("DocumentContent", sql.VarBinary(sql.MAX), fileData)
      .query("INSERT INTO Document (DocumentName, DocumentContent) VALUES (@DocumentName, @DocumentContent)");

    res.send("File uploaded successfully.");
  } catch (err) {
    console.error("Error inserting file into database:", err);
    res.status(500).send("Error uploading file.");
  }
});

module.exports = router;

