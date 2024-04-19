const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Config environment variables at the start
const matchedUserRoutes = require('./Routes/MatchedUser');
const connectDB = require('./config/db');

const app = express(); // Instantiate the app before using middleware

app.use(cors()); 
app.use(express.json()); 

connectDB(); 

app.use('/matches', matchedUserRoutes); /

module.exports = app; // Export the app
