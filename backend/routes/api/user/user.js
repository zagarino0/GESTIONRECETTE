const express = require('express');
const router = express.Router();
const userController = require('../../../controller/userController');

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.addNewUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/:id')
    .get(userController.getUser);

module.exports = router;