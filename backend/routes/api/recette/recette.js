const express = require('express');
const router = express.Router();
const recetteController = require('../../../controller/recette/recetteController');
const situationController = require('../../../controller/recette/situationController');
const ordreVirementController = require('../../../controller/recette/orderVirementController');

router.route('/declarationperiodique')
    .post(recetteController.setModePaymentPeriodique);

router.route('/declarationnonperiodique')
    .post(recetteController.setModePaymentNonPeriodique);

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

// Ordre de virement
router.route('/ov')
    .post(ordreVirementController.setAvisDeCredit);

router.route('/ov/bordereau')
    .post(ordreVirementController.getAvisDeCreditByNumBordereau);

router.route('/ov/visualisation/aviscredit')
    .post(ordreVirementController.visualisationAvisCredit);

router.route('/client/ov')
    .post(ordreVirementController.setOrdreClient);

router.route('/encaissementbar')
    .post(situationController.getEncaissementBar);

router.route('/encaissementcheque')
    .post(situationController.getEncaissementCheque);

router.route('/encaissementespece')
    .post(situationController.getEncaissementEspece);

router.route('/encaissementbcm')
    .post(situationController.getEncaissementBCM);

router.route('/recette/deuxdates')
    .post(situationController.extraitTotauxRecetteEntreDeuxDate);

module.exports = router;