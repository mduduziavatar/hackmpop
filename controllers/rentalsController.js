const rentalModel = require('../models/rentalModel');

async function getRentalByItemType(req, res) {
    const town = req.params.town;
    const rentalType = req.params.rentalType;
    const itemType = req.params.itemType;

    try {
        // Retrieve rental data by town, rental type, and item type from the database
        const rentals = await rentalModel.getRentalByItemType(town, rentalType, itemType);

        // Render the rental template with the data
        res.render('rentals', { town, rentalType, itemType, rentals });
    } catch (error) {
        console.error('Error fetching rentals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getRentalByItemType,
};