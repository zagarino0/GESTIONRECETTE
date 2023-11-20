const express = require('express');
const router = express.Router();
const recetteController = require('../../../controller/recette/recetteController');

router.route('/declaration')
    .post(recetteController.setModePayment);

module.exports = router;