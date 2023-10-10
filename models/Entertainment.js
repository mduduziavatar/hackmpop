const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as needed

const Entertainment = sequelize.define('Entertainment', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    entertainmentType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    town: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Add more attributes when needed
});

// Define associations
Entertainment.associate = (models) => {
    // An Entertainment belongs to a User
    Entertainment.belongsTo(models.User, {
        foreignKey: {
            allowNull: false, // Entertainment must have an associated User
        },
        onDelete: 'CASCADE', // Delete Entertainment when User is deleted
    });
};

module.exports = Entertainment;
