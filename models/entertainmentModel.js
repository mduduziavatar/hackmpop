const db = require('../db');

function getEntertainmentByItemType(town, entertainmentType, itemType) {
    return db.any('SELECT * FROM entertainment WHERE town = $1 AND type = $2 AND item_type = $3', [town, entertainmentType, itemType]);
}

module.exports = {
    getEntertainmentByItemType,
};
