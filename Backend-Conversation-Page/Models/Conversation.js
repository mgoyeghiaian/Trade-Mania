const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  room: {
    type: String,
    required: true
  },
  messages: [{
    _id: Schema.Types.ObjectId,
    sender: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
