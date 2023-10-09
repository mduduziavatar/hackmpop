const entertainmentModel = require('../models/entertainmentModel');

async function getEntertainmentByItemType(req, res) {
    const town = req.params.town;
    const entertainmentType = req.params.entertainmentType;
    const itemType = req.params.itemType;

    try {
        // Retrieve entertainment data by town, entertainment type, and item type from the database
        const entertainment = await entertainmentModel.getEntertainmentByItemType(town, entertainmentType, itemType);

        // Render the entertainment template with the data
        res.render('entertainment', { town, entertainmentType, itemType, entertainment });
    } catch (error) {
        console.error('Error fetching entertainment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getEntertainmentByItemType,
};
