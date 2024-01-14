const express = require('express');
const router = express.Router();
const clientController = require('../../../controller/immatriculation/clientController');

router.route('/')
    .get(clientController.getAllclients)

router.route('/:nif')
    .get(clientController.getClientByReferenceFiscal);

router.route('/prisecharge')
    .post(clientController.getClientNonPriseChargeByReferenceFiscal);

module.exports = router;