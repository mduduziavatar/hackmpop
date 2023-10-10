const rentalModel = require('../models/Rental');

// Get all rentals in a specific town
async function getAllRentals(req, res) {
    const town = req.params.town;

    try {
        const rentals = await rentalModel.getAllRentalsInTown(town);
        res.render('rentals', { town, rentals });
    } catch (error) {
        console.error('Error fetching rentals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get all houses for rent in a specific town
async function getAllHouses(req, res) {
    const town = req.params.town;

    try {
        const houses = await rentalModel.getAllHousesInTown(town);
        res.render('houses', { town, houses });
    } catch (error) {
        console.error('Error fetching houses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get all cars for rent in a specific town
async function getAllCars(req, res) {
    const town = req.params.town;

    try {
        const cars = await rentalModel.getAllCarsInTown(town);
        res.render('cars', { town, cars });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Create a new rental listing in a specific town
async function createRental(req, res) {
    const town = req.params.town;
    const rentalData = req.body;

    try {
        const newRental = await rentalModel.createRentalInTown(town, rentalData);
        res.status(201).json(newRental);
    } catch (error) {
        console.error('Error creating rental:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get rental by ID in a specific town
async function getRentalById(req, res) {
    const town = req.params.town;
    const rentalId = req.params.id;

    try {
        const rental = await rentalModel.getRentalInTownById(town, rentalId);
        res.render('rentalDetails', { town, rental });
    } catch (error) {
        console.error('Error fetching rental by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Update a rental listing in a specific town by ID
async function updateRental(req, res) {
    const town = req.params.town;
    const rentalId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedRental = await rentalModel.updateRentalInTownById(town, rentalId, updatedData);
        res.status(200).json(updatedRental);
    } catch (error) {
        console.error('Error updating rental by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete a rental listing in a specific town by ID
async function deleteRental(req, res) {
    const town = req.params.town;
    const rentalId = req.params.id;

    try {
        await rentalModel.deleteRentalInTownById(town, rentalId);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting rental by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllRentals,
    getAllHouses,
    getAllCars,
    createRental,
    getRentalById,
    updateRental,
    deleteRental,
};
