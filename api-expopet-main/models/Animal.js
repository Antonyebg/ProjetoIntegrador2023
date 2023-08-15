const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

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
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

Animal.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Animal;
