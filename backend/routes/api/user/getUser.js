const express = require('express');
const router = express.Router();
const getUserController = require('../../../controller/user/getUserController');

router.route('/')
    .get(getUserController.handleGetUser)

module.exports = router;