const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  isIncoming: {
    type: Boolean,
    required: true
  },
  isOnline: {
    type: Boolean,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  contactName: {
    type: String,
    required: true
  },
  iconImage: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);
