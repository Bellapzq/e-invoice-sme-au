require('dotenv').config();  // Load variables from .env file
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

// router for test document upload
const docUploads = require("./routes/docUpload");
app.use("/api/documents", docUploads);

// Start the server
const port = 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


