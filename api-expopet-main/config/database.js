const { Sequelize } = require('sequelize');
const config = require('../config/config.json'); // Adjust the path as needed

const env = process.env.NODE_ENV || 'development';
const databaseConfig = config[env];

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect,
  }
);

module.exports = sequelize;
