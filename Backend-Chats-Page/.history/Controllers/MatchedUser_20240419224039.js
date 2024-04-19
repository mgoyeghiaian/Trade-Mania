const MatchedUser = require('../Models/MatchedUser');
const { io } = require('../index'); 

exports.addMatchedUser = async (req, res) => {
  try {
    const newUser = new MatchedUser(req.body);
    await newUser.save();
    io.emit('new-match', newUser); 
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOnlineStatus = async (req, res) => {
  try {
    const { userId, isOnline } = req.body;
    const updatedUser = await MatchedUser.findByIdAndUpdate(userId, { isOnline }, { new: true });
    io.emit('online-status-changed', { userId: updatedUser._id, isOnline: updatedUser.isOnline }); // Emitting online status event
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
