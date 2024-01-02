const express = require('express');
const router = express.Router();
const recetteController = require('../../../controller/recette/recetteController');
const situationController = require('../../../controller/recette/situationController');

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

router.route('/client/daterecepisse')
    .post(recetteController.getClientByRecepisseAndDate);

router.route('/situation/decade')
    .post(situationController.getRecetteByDecade);

router.route('/situation/deuxdate')
    .post(situationController.getRecetteByTwoDate);



module.exports = router;