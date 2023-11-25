const express = require('express');
const router = express.Router();
const consultationController = require('../../../controller/consultation/consultationController');

router.route('/nomcommercial')
    .post(consultationController.getClientByNomCommercial);

router.route('/cin')
    .post(consultationController.getClientByCIN);

router.route('/nif')
    .post(consultationController.getClientByNif);

router.route('/numerostatistique')
    .post(consultationController.getClientByNumeroStatistique);

router.route('/adresse')
    .post(consultationController.getClientByAddresse);


module.exports = router;