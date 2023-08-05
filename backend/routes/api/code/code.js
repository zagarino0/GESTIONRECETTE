const express = require('express');
const router = express.Router();
const codeController = require('../../../controller/code/codeController');

router.route('/geographique')
    .get(codeController.getCodeGeographique);

router.route('/banque')
    .get(codeController.getCodeBanque);

router.route('/formejuridique')
    .get(codeController.getCodeFormeJuridique);

router.route('/impot')
    .get(codeController.getCodeImpot);

router.route('/periodicite')
    .get(codeController.getPeriodicite);

router.route('/processverbaux')
    .get(codeController.getProcesVerbaux);

router.route('/operateurtelephonique')
    .get(codeController.getOperateurTelephonique);

router.route('/datecloture')
    .get(codeController.getDateCloture);

router.route('/codeperiodicite')
    .get(codeController.getCodePeriodicite);

router.route('/affectationbudgetaire')
    .get(codeController.getAffectationBudgetaire);

router.route('/obligationfiscal')
    .get(codeController.getObligationFiscale)

router.route('/numerobudget')
    .get(codeController.getNumeroBudget);

router.route('/codeactivite')
    .get(codeController.getCodeActivite);

router.route('/grandsimpot')
    .get(codeController.getGrandsImpots);

router.route('/chefaction')
    .get(codeController.getChefAction);

router.route('/typeprevision')
    .get(codeController.getTypePrevision);

router.route('/jourferie')
    .get(codeController.getJourFerie);

module.exports = router;