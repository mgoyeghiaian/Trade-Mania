require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("./config/db");
const express = require("express");
const app = express();
const cors = require('cors');
const Profile = require('./routes/Profile')
mongoose.set("strictQuery", true);

app.use(cors());

connection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/profile', Profile);

const port = process.env.PORT || 8080;

const server = require('http').createServer(app);

const { setupSocket } = require('./middleware/socket');

const io = setupSocket(server);

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

module.exports = io;