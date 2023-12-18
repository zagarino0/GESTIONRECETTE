const express = require('express');
const router = express.Router();
const recetteController = require('../../../controller/recette/recetteController');

router.route('/declaration')
    .post(recetteController.setModePayment);

router.route('/consultationpayment')
    .post(recetteController.getPaymentByTwoDate);

router.route('/payment')
    .get(recetteController.getAllPayment);

router.route('/client/addresse')
    .post(recetteController.getClientByAddresse);

router.route('/client/nomcommercial')
    .post(recetteController.getClientByNomCommercial);

router.route('/client/raisoncommercial')
    .post(recetteController.getClientByRaisonSocial);

router.route('/recepisse')
    .post(recetteController.getClientByRecepisse);

router.route('/recapitulatif')
    .post(recetteController.getRecapRecette);

module.exports = router;