const express = require('express');
const router = express.Router();
const chatController = require('../Controllers/ChatControllers');

router.get('/', chatController.getMessages);


router.post('/', chatController.createMessage);


router.patch('/:id', chatController.updateMessage);


router.delete('/:id', chatController.deleteMessage);

module.exports = router;
