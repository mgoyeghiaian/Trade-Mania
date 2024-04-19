const express = require('express');
require('dotenv').config();
const matchedUserRoutes = require('./Routes/MatchedUser');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
app.use(express.json());

connectDB();

app.use('/matches', matchedUserRoutes);

module.exports = app;
