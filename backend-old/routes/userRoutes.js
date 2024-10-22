// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');  // database set up
const jwt = require('jsonwebtoken'); // 引入jsonwebtoken
const secretKey = process.env.SECRET_KEY;
console.log("SECRET_KEY:", secretKey); // 打印SECRET_KEY值
const verifyToken = require('../authMiddleware'); 

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

    const user = result.recordset[0];

    // 生成JWT token，包括用户ID和其他信息
    const token = jwt.sign(
        {id:user.user_id, email:user.email},
        secretKey,
        {expiresIn: '5h'} //expires time
    )

    // log in success
    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 受保护的路由
router.get('/protected-route', verifyToken, (req, res) => {
    // 通过认证后可以在这里处理受保护的逻辑
    res.status(200).json({ message: 'This is protected data.' });
  });

// Register Routing
router.post('/sign-up', async (req, res)=> {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    try{
        let pool = await sql.connect(dbConfig);

        //检查email是否存在
        let checkUser = await pool.request()
         .input('email', sql.NVarChar, email) 
         .query('SELECT * FROM user_info WHERE email = @email');

        if (checkUser.recordset.length > 0){
            return res.status(400).json({ message: 'User already exists'});
        }

        // Insert new account's information
        let result = await pool.request()
         .input('firstName', sql.NVarChar, firstName)
         .input('lastName', sql.NVarChar, lastName)
         .input('phone_number', sql.NVarChar, phoneNumber)
         .input('email', sql.NVarChar, email)
         .input('password', sql.NVarChar, password)
         .input('user_status', sql.NVarChar, 'user')
         .query('INSERT INTO user_info(first_name, last_name, phone_number, email, user_password, user_status) VALUES (@firstName, @lastName, @phone_number, @email, @password, @user_status)');

        return res.status(201).json({ message: 'User registered successfully' });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;