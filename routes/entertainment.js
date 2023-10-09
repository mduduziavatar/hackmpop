const express = require('express');
const router = express.Router();
const entertainmentController = require('../controllers/entertainmentController'); 

// General entertainment route
router.get('/:town', entertainmentController.handleEntertainment);

// Markets route
router.get('/:town/markets', entertainmentController.handleMarkets);

// Clubs route
router.get('/:town/clubs', entertainmentController.handleClubs);

module.exports = router;
