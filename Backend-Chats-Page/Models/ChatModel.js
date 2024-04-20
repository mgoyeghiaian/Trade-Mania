const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: String,
  isIncoming: Boolean,
  isOnline: Boolean,
  time: { type: Date, default: Date.now }, 
  contactName: String,
  iconImage: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }); 

module.exports = mongoose.model('Message', messageSchema);
