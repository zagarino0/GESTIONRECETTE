const express = require('express');
const router = express.Router();
const declarationController = require('../../../controller/recette/declarationController');

router.route('/declaration')
    .post(declarationController.setModePayment);

module.exports = router;