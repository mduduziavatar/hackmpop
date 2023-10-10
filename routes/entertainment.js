const express = require('express');
const router = express.Router();
const entertainmentController = require('../controllers/entertainmentController'); 

// General entertainment route
router.get('/:town', entertainmentController.handleEntertainment);

// Markets route
router.get('/:town/markets', entertainmentController.handleMarkets);

// Clubs route
router.get('/:town/clubs', entertainmentController.handleClubs);

// Create a new entertainment entry
router.post('/', entertainmentController.createEntertainment);

// Get a list of all entertainment options
router.get('/', entertainmentController.getAllEntertainment);

// Get details of a specific entertainment option
router.get('/:id', entertainmentController.getEntertainmentById);

// Update a specific entertainment option
router.put('/:id', entertainmentController.updateEntertainment);

// Delete a specific entertainment option
router.delete('/:id', entertainmentController.deleteEntertainment);

module.exports = router;
