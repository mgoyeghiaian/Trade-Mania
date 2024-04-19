const express = require('express');
const router = express.Router();
const matchedUserController = require('../controllers/matchedUserController');

// Routes for matched users
router.get('/', matchedUserController.getMatchedUsers);
router.post('/', matchedUserController.addMatchedUser);
router.patch('/updateStatus', matchedUserController.updateOnlineStatus);

module.exports = router;
