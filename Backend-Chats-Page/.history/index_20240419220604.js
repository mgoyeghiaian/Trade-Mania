require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());  // for parsing application/json



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});