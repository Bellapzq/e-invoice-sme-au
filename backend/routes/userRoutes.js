// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');  // database set up

// Login Routing
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let pool = await sql.connect(dbConfig);

    // Query user information
    let result = await pool.request()
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, password)
      .query('SELECT * FROM user_info WHERE email = @email AND user_password = @password');

    // 检查结果是否为空 if query result is empty, password is wrong ot email is not exit
    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // log in success
    return res.status(200).json({ message: 'Login successful', user: result.recordset[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;