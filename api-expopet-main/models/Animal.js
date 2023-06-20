const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Animal = sequelize.define('Animal', {
	nome: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	cordosolhos: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	cor: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	porte: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	sexo: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	bairro: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	imagem: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});

module.exports = Animal;
