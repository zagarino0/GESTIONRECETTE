const express = require('express');
const router = express.Router();
const userController = require('../../../controller/user/userController');

router.post('/register', userController.handleNewUser);
router.post('/auth', userController.handleLogin);
router.get('/get', userController.handleGetUser);
router.put('/updatepassword', userController.handleUpdatePassword);
router.get('/refresh', userController.handleRefreshToken);
router.get('/logout', userController.handleLogout);

module.exports = router;