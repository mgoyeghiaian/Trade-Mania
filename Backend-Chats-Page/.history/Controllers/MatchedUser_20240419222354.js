const MatchedUser = require('../Models/MatchedUser');

exports.getMatchedUsers = async (req, res) => {
  try {
    const matchedUsers = await MatchedUser.find();
    res.status(200).json(matchedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addMatchedUser = async (req, res) => {
  try {
    const newUser = new MatchedUser(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user online status
exports.updateOnlineStatus = async (req, res) => {
  try {
    const { userId, isOnline } = req.body;
    const updatedUser = await MatchedUser.findByIdAndUpdate(userId, { isOnline }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
