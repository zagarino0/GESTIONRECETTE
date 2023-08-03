const express = require('express');
const router = express.Router();
const registerController = require('../../../controller/user/registerController');

router.post('/', registerController.handleNewUser);

module.exports = router;