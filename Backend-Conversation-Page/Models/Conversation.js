// models/Conversation.js
const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  content: String,
  contentType: {
    type: String,
    enum: ['text', 'image'],
    default: 'text'
  },
  timestamp: { type: Date, default: Date.now }
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
