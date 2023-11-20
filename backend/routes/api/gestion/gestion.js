const express = require('express');
const router = express.Router();
const gestionController = require('../../../controller/gestion/gestionController');

router.route('/')
    .post(gestionController.getClientByNif);

router.route('/restearecouvrer')
    .get(gestionController.getAllResteARecouvrer)
    .post(gestionController.getResteARecouvrerBetweenTwoDate);

router.route('/recette')
    .post(gestionController.getRecetteBetweenTwoDate);

module.exports = router;
