const express = require('express');
const router = express.Router();
const gestionController = require('../../../controller/gestion/gestionController');

router.route('/')
    .post(gestionController.getClientByNif);

module.exports = router;
