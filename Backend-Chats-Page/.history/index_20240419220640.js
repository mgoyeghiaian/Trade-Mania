require('dotenv').config();
const express = require('express');
const connectDB = require('./config');

const app = express();

connectDB();

app.use(express.json());



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
