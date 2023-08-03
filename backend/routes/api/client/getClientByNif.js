const express = require('express');
const router = express.Router();
const getClientByNif = require('../../../controller/client/getClientByNifController');


router.route('/')
    .post(getClientByNif);

module.exports = router;