const socketIo = require('socket.io');
const Conversation = require('./Models/Conversation');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('new conversation', async ({ sender, receiver, content, contentType }) => {
      try {
       
        const conversation = new Conversation({ sender, receiver, content, contentType });
        await conversation.save();

        io.to(receiver).emit('conversation', conversation);
      } catch (error) {
        console.error('Error saving conversation:', error);
      }
    });

    
    socket.on('join', (username) => {
      socket.join(username); 
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
