const express = require('express');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');
const socketHandler = require('./socket');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

connectDB();


app.use(cors({
    origin: 'http://localhost:8100',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server is running');
});

const server = http.createServer(app);
socketHandler(server);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
