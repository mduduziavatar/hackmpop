const { Sequelize } = require('sequelize');

// Connection parameters
const sequelize = new Sequelize('popup', 'mdu', '1761', {
  host: 'localhost', // Update this with your database host if it's not on your local machine
  dialect: 'postgres', // Specify the dialect (e.g., PostgreSQL)
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, testDbConnection };
