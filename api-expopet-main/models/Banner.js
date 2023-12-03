const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Banner = sequelize.define('Banner', {
	nome: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	imagem: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});

module.exports = Banner;
