const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config'); // Import the Sequelize instance

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add more attributes when needed
});

// Define associations
User.associate = (models) => {
  // A User can have many Entertainment entries
  User.hasMany(models.Entertainment, {
    foreignKey: 'userId',
  });

  // A User can have many Rental entries
  User.hasMany(models.Rental, {
    foreignKey: 'userId',
  });
};

module.exports = User;
