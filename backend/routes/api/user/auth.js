const express = require('express');
const router = express.Router();
const authController = require('../../../controller/user/authController');

router.post('/', authController.handleLogin);

module.exports = router;