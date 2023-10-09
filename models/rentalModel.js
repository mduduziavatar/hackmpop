const db = require('../db');

function getRentalByItemType(town, rentalType, itemType) {
    return db.any('SELECT * FROM rentals WHERE town = $1 AND type = $2 AND item_type = $3', [town, rentalType, itemType]);
}

module.exports = {
    getRentalByItemType,
};