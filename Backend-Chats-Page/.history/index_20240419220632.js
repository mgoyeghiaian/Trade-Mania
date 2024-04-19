require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());



// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
