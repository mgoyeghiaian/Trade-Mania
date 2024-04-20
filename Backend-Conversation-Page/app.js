const express = require('express');
const cors = require('cors');
require('dotenv').config();
const matchedUserRoutes = require('./Routes/MatchedUser');
const ChatRoutes = require('./Routes/ChatRoutes');

const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/matches', matchedUserRoutes);
app.use('/chat', ChatRoutes);

module.exports = app; 
