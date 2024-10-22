const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();  // 加载 .env 文件中的变量

const app = express();
app.use(bodyParser.json());
app.use(cors());

// router
const userRoutes = require('./routes/userRoutes'); 
app.use('/api/users', userRoutes); // All user related API routes

// Start the server
const port = 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

