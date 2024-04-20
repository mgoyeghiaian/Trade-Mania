const Message = require('../Models/ChatModel');
const { getIo } = require('../socket');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createMessage = async (req, res) => {
  const message = new Message({
    text: req.body.text,
    isIncoming: req.body.isIncoming,
    isOnline: req.body.isOnline,
    time: req.body.time || new Date(),
    contactName: req.body.contactName,
    iconImage: req.body.iconImage
  });

  try {
    const newMessage = await message.save();
    const io = getIo();
    io.emit('message-created', newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const io = getIo();

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, time: new Date() } },
      { new: true }
    );
    io.emit('message-updated', updatedMessage);
    res.json(updatedMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    const io = getIo();
    io.emit('message-deleted', { id: req.params.id });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
