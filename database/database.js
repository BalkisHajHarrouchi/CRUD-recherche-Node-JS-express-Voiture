const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = initialize;

async function initialize() {
  // Create the database if it doesn't already exist
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // Connect to the database
  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

  console.log("User#########");

  // Initialize models and add them to the exported db object
  const models = {
    User: require('../models/User')(sequelize),
    Voiture: require('../models/Voiture')(sequelize),
    // Add other models here if needed
  };

  // Sync all models with the database
  await sequelize.sync();

  // Return the db object with sequelize and models
  return {
    sequelize,
    ...models
  };
}