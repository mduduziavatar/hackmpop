const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Rental = sequelize.define('Rental', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    rentalType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    town: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    // Add more attributes when needed
});

// Define associations
Rental.associate = (models) => {
    // A Rental belongs to a User
    Rental.belongsTo(models.User, {
        foreignKey: {
            allowNull: false, // Rental must have an associated User
        },
        onDelete: 'CASCADE', // Delete Rental when User is deleted
    });
};

module.exports = Rental;
