const express = require('express');
const router = express.Router();
const codeController = require('../../../controller/code/codeController');

router.route('/geographique')
    .get(codeController.getCodeGeographique)
    .post(codeController.setCodeGeographique);    
router.route('/geographique/:id')
    .get(codeController.getCodeGeographiqueById)
    .put(codeController.updateCodeGeographique)
    .delete(codeController.deleteCodeGeographique);

router.route('/banque')
    .get(codeController.getCodeBanque);

router.route('/formejuridique')
    .get(codeController.getCodeFormeJuridique);

router.route('/impot')
    .get(codeController.getCodeImpot);
router.route('/impot/:numero_impot')
    .get(codeController.getCodeImpotByNumber);

router.route('/periodicite')
    .get(codeController.getPeriodicite)
    .post(codeController.setPeriodicite);
router.route('/periodicite/:id')
    .get(codeController.getPeriodiciteById)
    .put(codeController.updatePeriodicite)
    .delete(codeController.deletePeriodicite);

router.route('/processverbaux')
    .get(codeController.getProcesVerbaux);

router.route('/operateurtelephonique')
    .get(codeController.getOperateurTelephonique);

router.route('/datecloture')
    .get(codeController.getDateCloture)
    .post(codeController.setDateCloture);
router.route('/datecloture/:numero')
    .get(codeController.getDateClotureByNumber)
    .put(codeController.updateDateCloture)
    .delete(codeController.deleteDateCloture);

router.route('/codeperiodicite')
    .get(codeController.getCodePeriodicite)
    .post(codeController.setCodePeriodicite);
router.route('/codeperiodicite/:numero')
    .get(codeController.getCodePeriodiciteByNumber)
    .put(codeController.updateCodePeriodicite)
    .delete(codeController.deleteCodePeriodicite);

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