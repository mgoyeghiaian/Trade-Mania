const express = require('express');
const cors = require('cors');
require('dotenv').config();


const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();


module.exports = app; 
