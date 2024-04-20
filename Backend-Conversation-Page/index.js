const app = require('./app');
const { createServer } = require('http');
const { initIo } = require('./socket');

const server = createServer(app);
initIo(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
