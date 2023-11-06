const express = require('express');
const router = express.Router();
const chargeController = require('../../../controller/immatriculation/chargeController');

router.route('/')
    .post(chargeController.addnewClient);

router.route('/:nif')
    .get(chargeController.getClient);

router.route('/physique/:cin')
    .get(chargeController.getClientByCin);

router.route('/morale/:statistique')
    .get(chargeController.getClientByStatistique);


module.exports = router;