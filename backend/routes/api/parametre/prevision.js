const express = require('express');
const router = express.Router();
const previsionController = require('../../../controller/parametre/previsionController');

router.route('/')
    .get(previsionController.getAllPrevisions)
    .post(previsionController.setPrevision)
    .put(previsionController.updatePrevision);


module.exports = router;