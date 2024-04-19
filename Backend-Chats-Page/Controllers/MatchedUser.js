const MatchedUser = require('../Models/MatchedUser');
const { getIo } = require('../socket');  // Correct the path if necessary

exports.addMatchedUser = async (req, res) => {
  console.log("Received body:", req.body);
  try {
    const newUser = new MatchedUser(req.body);
    await newUser.save();
    const io = getIo();  // Get the io instance
    io.emit('new-match', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);  // It's good to log the error to the console for debugging
    res.status(400).json({ message: error.message });
  }
};

exports.getMatchedUsers = async (req, res) => {
  try {
    const matchedUsers = await MatchedUser.find();
    res.status(200).json(matchedUsers);
    const io = getIo(); 
    io.emit('matches-updated', matchedUsers);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.updateOnlineStatus = async (req, res) => {
  try {
    const { userId, isOnline } = req.body;
    const updatedUser = await MatchedUser.findByIdAndUpdate(userId, { isOnline }, { new: true });
    const io = getIo();  
    io.emit('online-status-changed', { userId: updatedUser._id, isOnline: updatedUser.isOnline });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
