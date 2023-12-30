const express = require('express');
const router = express.Router();
const clientController = require('../../../controller/immatriculation/clientController');

router.route('/')
    .get(clientController.getAllclients)
    .post(clientController.addnewClient)
    .put(clientController.updateClient)
    .delete(clientController.deleteClient);

router.route('/:nif')
    .get(clientController.getClient);

router.route('/prisecharge')
    .post(clientController.getClientNonPriseCharge);

module.exports = router;