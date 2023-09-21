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
    .get(codeController.getCodeBanque)
    .post(codeController.setCodeBanque);
router.route('/banque/:id')
    .get(codeController.getCodeBanqueById)
    .put(codeController.updateCodeBanque)
    .delete(codeController.deleteCodeBanque);

//code forme juridique
router.route('/formejuridique')
    .get(codeController.getCodeFormeJuridique)
    .post(codeController.setCodeFormeJuridique);
router.route('/formejuridique/:code')
    .get(codeController.getCodeFormeJuridiqueByCode)
    .put(codeController.updateCodeFormeJuridique)
    .delete(codeController.deleteCodeFormeJuridique)

    //code impot
router.route('/impot')
    .get(codeController.getCodeImpot)
    .post(codeController.setCodeImpot);
router.route('/impot/:numero_impot')
    .get(codeController.getCodeImpotByNumber)
    .put(codeController.updateCodeImpot)
    .delete(codeController.deleteCodeImpot);


//periodicité
router.route('/periodicite')
    .get(codeController.getPeriodicite)
    .post(codeController.setPeriodicite);
router.route('/periodicite/:id')
    .get(codeController.getPeriodiciteById)
    .put(codeController.updatePeriodicite)
    .delete(codeController.deletePeriodicite);

//proès verbaux
router.route('/procesverbaux')
    .get(codeController.getProcesVerbaux)
    .post(codeController.setProcesVerbaux);
router.route('/procesverbaux/:id')
    .get(codeController.getProcesVerbauxById)
    .put(codeController.updateProcesVerbaux)
    .delete(codeController.deleteProcesVerbaux);

//operateur téléphonique
router.route('/operateurtelephonique')
    .get(codeController.getOperateurTelephonique)
    .post(codeController.setOperateurTelephonique);
router.route('/operateurtelephonique/:id')
    .get(codeController.getOperateurTelephoniqueById)
    .put(codeController.updateOperateurTelephonique)
    .delete(codeController.deleteOperateurTelephonique);

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
    .get(codeController.getAffectationBudgetaire)
    .post(codeController.setAffectationBudgetaire);
router.route('/affectationbudgetaire/:id')
    .get(codeController.getAffectationBudgetaireById)
    .put(codeController.updateAffectationBudgetaire)
    .delete(codeController.deleteAffectationBudgetaire);

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
    .get(codeController.getNumeroBudget)
    .post(codeController.setNumeroBudget);
router.route('/numerobudget/:numero')
    .get(codeController.getNumeroBudget)
    .put(codeController.updateNumeroBudget)
    .delete(codeController.deleteNumeroBudget);

//code activité
router.route('/codeactivite')
    .get(codeController.getCodeActivite)
    .post(codeController.setCodeActivite);
router.route('/codeactivite/:code')
    .get(codeController.getCodeActiviteByCode)
    .put(codeController.updateCodeActivite)
    .delete(codeController.deleteCodeActivite);

//grand impot
router.route('/grandsimpot')
    .get(codeController.getGrandsImpots);

//chef d'action
router.route('/chefaction')
    .get(codeController.getChefAction)
    .post(codeController.setChefAction);
router.route('/chefaction/:code')
    .get(codeController.getChefActionByCode)
    .put(codeController.updateChefAction)
    .delete(codeController.deleteChefAction);

//type de prevision
router.route('/typeprevision')
    .get(codeController.getTypePrevision)
    .post(codeController.setTypePrevision);
router.route('/typeprevision/:id')
    .get(codeController.getTypePrevisionById)
    .put(codeController.updateTypePrevision)
    .delete(codeController.deleteTypePrevision);

//jour ferié
router.route('/jourferie')
    .get(codeController.getJourFerie)
    .post(codeController.setJourFerie);
router.route('/jourferie/:id')
    .get(codeController.getJourFerieById)
    .put(codeController.updateJourFerie)
    .delete(codeController.deleteJourFerie);

//date echéance
router.route('/dateecheance')
    .get(codeController.getDateEcheance)
    .post(codeController.setDateEcheance);
router.route('/dateecheance/:id')
    .get(codeController.getDateEcheanceById)
    .put(codeController.updateDateEcheance)
    .delete(codeController.deleteDateEcheance);

//revenus salariaux
router.route('/revenusalariaux')
    .get(codeController.getRevenusSalariaux)
    .post(codeController.setRevenusSalariaux);
router.route('/revenusalariaux/:id')
    .get(codeController.getRevenusSalariauxById)
    .put(codeController.updateRevenusSalariaux)
    .delete(codeController.deleteRevenusSalariaux);
router.route('revenusalariaux/annee/:annee')
    .get(codeController.getRevenusSalariauxByYear);
router.route('revenusalariaux/code/:code')
    .get(codeController.getRevenusSalariauxByCode);


module.exports = router;