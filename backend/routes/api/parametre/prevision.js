const express = require('express');
const router = express.Router();
const previsionController = require('../../../controller/parametre/previsionController');

router.route('/')
    .get(previsionController.getAllPrevisions)
    .post(previsionController.setPrevision)
    .put(previsionController.updatePrevision);
router.route('/:id')
    .get(previsionController.getPrevisionById)
    .delete(previsionController.deletePrevisions);
router.route('/annee/:annee')
    .get(previsionController.getPrevisionByYear);


module.exports = router;