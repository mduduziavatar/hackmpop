const express = require('express');
const router = express.Router();
const rentalsController = require('../controllers/rentalsController');

// General rentals route
router.get('/:town', rentalsController.getAllRentals);

// Houses route
router.get('/:town/houses', rentalsController.getAllHouses);

// Cars route
router.get('/:town/cars', rentalsController.getAllCars);

router.post('/:town', rentalsController.createRental);

router.get('/:town/:id', rentalsController.getRentalById);

router.put('/:town/:id', rentalsController.updateRental);

router.delete('/:town/:id', rentalsController.deleteRental);

module.exports = router;
