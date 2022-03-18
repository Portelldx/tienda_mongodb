// Constructor Sequelize
const { Sequelize } = require('sequelize');

// Instancia de Sequelizer y parametros de la base de datos
const sequelize = new Sequelize('tienda_online', 'root', 'a2361989', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
