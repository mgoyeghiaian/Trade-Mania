const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
app.use(express.json());

const server = http.createServer(app);

// Setting up Socket.IO with CORS configuration
const io = socketIo(server, {
    cors: {
        origin: "*",        // Allows requests from all origins
        methods: ["GET", "POST"]
    }
});

// Function to safely access the initialized io object
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

