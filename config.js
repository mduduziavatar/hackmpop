const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres', // Use the PostgreSQL dialect
  host: 'localhost', // Replace with your PostgreSQL server host
  port: 5432, // Replace with your PostgreSQL server port
  username: 'mdu', // Replace with your PostgreSQL username
  password: '1761', // Replace with your PostgreSQL password
  database: 'popup', // Replace with your PostgreSQL database name
});

module.exports = sequelize;
