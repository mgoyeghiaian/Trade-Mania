const User = require('../models/Profile');
const socketIO = require('../middleware/socket');

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const isOnline = socketIO.isUserOnline(userId);
    res.json({ userId, isOnline });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserStatus
}