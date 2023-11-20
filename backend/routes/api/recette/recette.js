const express = require('express');
const router = express.Router();
const recetteController = require('../../../controller/recette/recetteController');

router.route('/declaration')
    .post(recetteController.setModePayment);

router.route('/consultationpayment')
    .post(recetteController.getPaymentByTwoDate);

router.route('/payment')
    .get(recetteController.getAllPayment);

module.exports = router;