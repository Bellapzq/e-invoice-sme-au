require('dotenv').config();  // 加载 .env 文件中的变量
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// router for user
const userRoutes = require('./routes/userRoutes'); 
app.use('/api/users', userRoutes); // All user related API routes

// router for relationship setup
const relationshipRoutes = require('./routes/relationshipRoutes'); 
app.use('/api/relationships', relationshipRoutes);

// Start the server
const port = 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


