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
	tem_dono: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
	animal_perdido: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
	para_adocao: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
});

Animal.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Animal;
