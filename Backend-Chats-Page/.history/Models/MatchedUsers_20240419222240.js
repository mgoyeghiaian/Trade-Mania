const mongoose = require('mongoose');

const matchedUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  },
  isOnline: {
    type: Boolean,
    default: false
  }
});

const MatchedUser = mongoose.model('MatchedUser', matchedUserSchema);
module.exports = MatchedUser;
