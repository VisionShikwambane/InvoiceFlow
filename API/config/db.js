const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('invoicydb', 'root', 'Camelsa@123', {
  host: 'localhost', // Replace with your database host
  dialect: 'mysql', // Change to 'postgres', 'sqlite', etc., if using another database
  logging: false,    // Disable logging for cleaner output
});

module.exports = sequelize;
