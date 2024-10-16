const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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