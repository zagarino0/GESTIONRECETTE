const express = require('express');
const router = express.Router();
const clientController = require('../../../controller/immatriculation/clientController');

router.route('/')
    .get(clientController.getAllclients)
    .post(clientController.getClientPriseChargeByReferenceFiscal);

router.route('/nonprisecharge')
    .post(clientController.getClientNonPriseChargeByReferenceFiscal);

module.exports = router;