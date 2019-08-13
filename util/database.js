const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'MySQL_123', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;