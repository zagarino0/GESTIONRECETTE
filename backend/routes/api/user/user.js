const express = require('express');
const router = express.Router();
const userController = require('../../../controller/user/userController');

router.post('/register', userController.handleNewUser);
router.post('/auth', userController.handleLogin);
router.get('/all', userController.handleGetAllUser);
router.get('/:code', userController.handleGetUserByCode);
router.put('/updateuser', userController.handleUpdateUser);
router.put('/updatepassword', userController.handleUpdatePassword);
router.get('/refresh', userController.handleRefreshToken);
router.get('/logout', userController.handleLogout);
router.delete('/:id', userController.handleDeleteUser);

module.exports = router;