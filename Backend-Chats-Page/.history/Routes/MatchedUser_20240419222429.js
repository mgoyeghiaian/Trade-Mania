const express = require('express');
const router = express.Router();
const matchedUserController = require('../Controllers/MatchedUser');

router.get('/', matchedUserController.getMatchedUsers);
router.post('/', matchedUserController.addMatchedUser);
router.patch('/updateStatus', matchedUserController.updateOnlineStatus);

module.exports = router;
