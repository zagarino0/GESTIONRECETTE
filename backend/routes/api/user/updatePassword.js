const express = require('express');
const router = express.Router();
const updatePasswordController = require('../../../controller/user/updatePasswordController');

router.put('/', updatePasswordController.handleUpdatePassword);

module.exports = router;