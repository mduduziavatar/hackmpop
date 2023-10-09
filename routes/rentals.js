const express = require('express');
const router = express.Router();
const rentalsController = require('../controllers/rentalsController'); 

// General rentals route
router.get('/:town', rentalsController.handleRentals);

// Houses route
router.get('/:town/houses', rentalsController.handleHouses);

// Cars route
router.get('/:town/cars', rentalsController.handleCars);

module.exports = router;
