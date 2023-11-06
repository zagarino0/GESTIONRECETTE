const express = require('express');
const router = express.Router();
const utilitaireController = require('../../../controller/immatriculation/utilitaireController');

router.route('/utilitaire')
    .post(utilitaireController.getClientDate);

module.exports = router;