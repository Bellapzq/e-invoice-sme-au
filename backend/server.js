const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const config = require('./config/dbConfig'); // database set up

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