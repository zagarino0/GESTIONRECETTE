const express = require('express');
const router = express.Router();
const codeController = require('../../../controller/code/codeController');

//code geographique
router.route('/geographique')
    .get(codeController.getCodeGeographique)
    .post(codeController.setCodeGeographique);    
router.route('/geographique/:id')
    .get(codeController.getCodeGeographiqueById)
    .put(codeController.updateCodeGeographique)
    .delete(codeController.deleteCodeGeographique);

//code banque
router.route('/banque')
    .get(codeController.getCodeBanque);

//code forme juridique
router.route('/formejuridique')
    .get(codeController.getCodeFormeJuridique);

//code impot
router.route('/impot')
    .get(codeController.getCodeImpot);
router.route('/impot/:numero_impot')
    .get(codeController.getCodeImpotByNumber);


//periodicité
router.route('/periodicite')
    .get(codeController.getPeriodicite)
    .post(codeController.setPeriodicite);
router.route('/periodicite/:id')
    .get(codeController.getPeriodiciteById)
    .put(codeController.updatePeriodicite)
    .delete(codeController.deletePeriodicite);

//proès verbaux
router.route('/processverbaux')
    .get(codeController.getProcesVerbaux);

//operateur téléphonique
router.route('/operateurtelephonique')
    .get(codeController.getOperateurTelephonique);

//date cloture
router.route('/datecloture')
    .get(codeController.getDateCloture)
    .post(codeController.setDateCloture);
router.route('/datecloture/:id')
    .get(codeController.getDateClotureByNumber)
    .put(codeController.updateDateCloture)
    .delete(codeController.deleteDateCloture);

//code periodicité
router.route('/codeperiodicite')
    .get(codeController.getCodePeriodicite)
    .post(codeController.setCodePeriodicite);
router.route('/codeperiodicite/:numero')
    .get(codeController.getCodePeriodiciteByNumber)
    .put(codeController.updateCodePeriodicite)
    .delete(codeController.deleteCodePeriodicite);

//affectation budgetaire
router.route('/affectationbudgetaire')
    .get(codeController.getAffectationBudgetaire);

//obligation fiscale
router.route('/obligationfiscal')
    .get(codeController.getObligationFiscale)
    .post(codeController.setObligationFiscale)
router.route('/obligationfiscal/:id')
    .get(codeController.getObligationFiscaleById)
    .put(codeController.updateObligationFiscale)
    .delete(codeController.deleteObligationFiscale);

//numero budget
router.route('/numerobudget')
    .get(codeController.getNumeroBudget);

//code activité
router.route('/codeactivite')
    .get(codeController.getCodeActivite);

//grand impot
router.route('/grandsimpot')
    .get(codeController.getGrandsImpots);

//chef d'action
router.route('/chefaction')
    .get(codeController.getChefAction);

//type de prevision
router.route('/typeprevision')
    .get(codeController.getTypePrevision);

//jour ferié
router.route('/jourferie')
    .get(codeController.getJourFerie)
    .post(codeController.setJourFerie);
router.route('/jourferie/:id')
    .get(codeController.getJourFerieById)
    .post(codeController.updateJourFerie)
    .delete(codeController.deleteJourFerie);

//date echéance
router.route('/dateecheance')
    .get(codeController.getDateEcheance)
    .post(codeController.setDateEcheance);
router.route('/dateecheance/:id')
    .get(codeController.getDateEcheanceById)
    .put(codeController.updateDateEcheance)
    .delete(codeController.deleteDateEcheance);
router.route('/dateecheance/:annee')
    .get(codeController.getDateEcheanceByYear);

//revenus salariaux
router.route('/revenusalariaux')
    .get(codeController.getRevenusSalariaux)
    .post(codeController.setRevenusSalariaux);
router.route('/revenusalariaux/:id')
    .get(codeController.getRevenusSalariauxById)
    .put(codeController.updateRevenusSalariaux)
    .delete(codeController.deleteRevenusSalariaux);
router.route('revenusalariaux/:annee')
    .get(codeController.getRevenusSalariauxByYear);
router.route('revenusalariaux/:code')
    .get(codeController.getRevenusSalariauxByCode);


module.exports = router;