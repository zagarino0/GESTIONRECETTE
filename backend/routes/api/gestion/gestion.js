const express = require('express');
const router = express.Router();
const gestionController = require('../../../controller/gestion/gestionController');

router.route('/')
    .post(gestionController.getClientByNif);

router.route('/restearecouvrer')
    .post(gestionController.getAllResteARecouvrer);

router.route('/restearecouvrer/deuxdate')
    .post(gestionController.getResteARecouvrerBetweenTwoDate);

router.route('/recette')
    .post(gestionController.getRecetteBetweenTwoDate);

module.exports = router;
