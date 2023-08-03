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

module.exports = router;