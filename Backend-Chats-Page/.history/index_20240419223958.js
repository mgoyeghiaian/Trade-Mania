const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const matchedUserRoutes = require('./routes/MatchedUser');
app.use('/api/matches', matchedUserRoutes);

// MongoDB Connection and other middleware setups...
const connectDB = require('./config/db');
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, io };

