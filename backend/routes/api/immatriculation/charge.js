const express = require('express');
const router = express.Router();
const chargeController = require('../../../controller/immatriculation/chargeController');

router.route('/')
    .post(chargeController.priseCharge)