const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
app.use(express.json());

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",        
        methods: ["GET", "POST"]
    }
});

function getIo() {
    return io;
}

const connectDB = require('./config/db');
connectDB();

const matchedUserRoutes = require('./Routes/MatchedUser');
app.use('/matches', matchedUserRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Socket.IO initialized:', getIo() !== undefined);
});

module.exports = { app, getIo };

