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

router.route('/client/date')
    .post(recetteController.getClientByDate);

router.route('/situation/decade')
    .post(situationController.getRecetteByDecade);

router.route('/situation/deuxdate')
    .post(situationController.getRecetteByTwoDate);

router.route('/extrait/date')
    .post(recetteController.getExtraitRecetteByDate);

router.route('/extrait/deuxdate')
    .post(recetteController.getExtraitRecetteByTwoDate);



module.exports = router;