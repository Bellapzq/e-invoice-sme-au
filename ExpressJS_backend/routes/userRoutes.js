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
      .query('SELECT user_id, email, user_status FROM user_info WHERE email = @email AND user_password = @password');

    // 检查结果是否为空 if query result is empty, password is wrong ot email is not exit
    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.recordset[0];
    // 生成JWT token，包括用户ID和其他信息
    const token = jwt.sign(
        {id: user.user_id, email: user.email, status: user.user_status},
        secretKey,
        //{expiresIn: '5h'} //expires time
    );

    // log in success
    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error executing query', err);
    // console.error(err);
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
         .input('CompanyName', sql.NVarChar(100), company_name)
         .input('CompanyABN', sql.NVarChar(100), company_abn)
         .input('CompanyUnitNumber', sql.NVarChar(100), company_unit_number)
         .input('CompanyAddress', sql.NVarChar(200), company_address)
         .input('CompanyState', sql.NVarChar(200), company_state)
         .input('CompanyPostalCode', sql.NVarChar(100), company_postal_code)
         .input('CompanyCountry', sql.NVarChar(50), company_country)
         .query(`INSERT INTO user_info 
          (first_name, last_name, phone_number, email, user_password, user_status, company_name, company_abn, company_unit_number, company_address, company_state, company_postal_code) 
          VALUES 
          (@firstName, @lastName, @phone_number, @email, @password, @user_status, @CompanyName, @CompanyABN), @CompanyUnitNumber, @CompanyAddress, @CompanyState, @CompanyPostalCode`);

        return res.status(201).json({ message: 'User registered successfully' });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User management (show user) Routing
router.get('/users', async (req,res) => {
    try{
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query(' SELECT * from user_info');
        return res.status(200).json(result.recordset);
    }catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Internal server erroe'});
    }
});

// User management (edit user) Routing
router.put('/users/:id', async (req,res) =>{
    const {id} = req.params;
    const { firstName, lastName, phone_number, email, user_status } = req.body;

    try{
        let pool = await sql.connect(dbConfig);
        await pool.request()
          .input('firstName', sql.NVarChar, firstName)
          .input('lastName', sql.NVarChar, lastName)
          .input('phone_number', sql.NVarChar, phone_number)
          .input('email', sql.NVarChar, email)
          .input('user_status', sql.NVarChar, user_status)
          .input('user_id', sql.Int, id)
          .query('UPDATE user_info SET first_name = @firstName, last_name = @lastName, phone_number = @phone_number, email = @email, user_status = @user_status WHERE user_id = @user_id');
  
    return res.status(200).json({ message: 'User updated successfully' });
    }catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal server error' });
    }
});

// User management (delete user) Routing
router.delete('/user/:id', async(req, res) => {
    const { id } = req.params;

    try{
        let pool = await sql.connect(dbConfig);
        await pool.request()
          .input('user_id', sql.Int, id)
          .query('DELETE FROM user_info WHERE user_id = @user_id');
    
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Internal server error' });
  }
});

// Profile - get company information
router.get('/profile', verifyToken, async (req, res) => {
    const userId = req.userId; // 从验证后的 token 中获取用户 ID

    try {
        let pool = await sql.connect(dbConfig);

        // 查询 user_info 表中的公司信息
        const result = await pool.request()
            .input('UserID', sql.Int, userId)
            .query(`
                SELECT company_name, company_abn, company_unit_number, company_address, 
                      company_state, company_postal_code
                FROM user_info
                WHERE user_id = @UserID
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(result.recordset[0]); // 返回公司信息
    } catch (error) {
        console.error('Error retrieving profile:', error);
        res.status(500).json({ message: 'Failed to retrieve profile', error });
    }
});

// 更新用户 Profile 的路由
router.put('/profile', verifyToken, async (req, res) => {
  const userId = req.userId; // 从验证后的 token 中获取用户 ID
  const {
      company_name,
      company_abn,
      company_unit_number,
      company_address,
      company_state,
      company_postal_code
  } = req.body; // 从请求体中获取公司信息字段

  try {
      let pool = await sql.connect(dbConfig);

      // 更新 user_info 表中的公司信息
      await pool.request()
          .input('UserID', sql.Int, userId)
          .input('CompanyName', sql.NVarChar(100), company_name)
          .input('CompanyABN', sql.NVarChar(100), company_abn)
          .input('CompanyUnitNumber', sql.NVarChar(100), company_unit_number)
          .input('CompanyAddress', sql.NVarChar(200), company_address)
          .input('CompanyState', sql.NVarChar(200), company_state)
          .input('CompanyPostalCode', sql.NVarChar(100), company_postal_code)
          .query(`
              UPDATE user_info
              SET 
                  company_name = @CompanyName,
                  company_abn = @CompanyABN,
                  company_unit_number = @CompanyUnitNumber,
                  company_address = @CompanyAddress,
                  company_state = @CompanyState,
                  company_postal_code = @CompanyPostalCode
              WHERE user_id = @UserID
          `);

      res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Failed to update profile', error });
  }
});


module.exports = router;