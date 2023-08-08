const express = require('express');
const router = express.Router();
const vehicleController = require('../../../controller/immatriculation/vehicleController');

router.route('/')
    .get(vehicleController.getAllVehicles)
    .post(vehicleController.addNewVehicle)
    .put(vehicleController.updateVehicle)
    .delete(vehicleController.deleteVehicle);

router.route('/:immatriculation')
    .get(vehicleController.getVehicle);

module.exports = router;