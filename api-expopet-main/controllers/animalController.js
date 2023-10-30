const fs = require('fs');
const cloudinary = require('../upload/local-asset.js'); //
const multer = require('multer');
const Animal = require('../models/Animal');

// Controller methods
const AnimalController = {
	getAllAnimals: async (req, res) => {
		try {
			const { cor, porte, corDosOlhos, bairro, sexo } = req.query; 

			const whereClause = {};

			if (cor) {
				whereClause.cor = cor;
			}
			if (porte) {
				whereClause.porte = porte;
			}
			if (corDosOlhos) {
				whereClause.cordosolhos = corDosOlhos;
			}
			if (bairro) {
				whereClause.bairro = bairro;
			}
			if (sexo) {
				whereClause.sexo = sexo;
			}

			const animals = await Animal.findAll({
				where: whereClause, 
				include: [
					{
						association: 'user',
						attributes: { exclude: ['senha'] },
					},
				],
			});

			res.json(animals);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	getAnimalById: async (req, res) => {
		const { id } = req.params;
		try {
			const animal = await Animal.findByPk(id);
			if (animal) {
				res.json(animal);
			} else {
				res.status(404).json({ error: 'Animal not found' });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	createAnimal: async (req, res) => {
		try {
			const { nome, cordosolhos, cor, porte, sexo, bairro } = req.body;
			imagem = req.file;
			const cloudinaryResponse = await cloudinary.uploader.upload(imagem.path, options = { folder: "pets" });

			// Create the new animal with the Cloudinary image URL and public_id
			const newAnimal = await Animal.create({
				nome,
				cordosolhos,
				cor,
				porte,
				sexo,
				bairro,
				user_id: req.user.id,
				imagem: cloudinaryResponse.secure_url, // Update the imagem field with Cloudinary URL
			});

			fs.unlinkSync(imagem.path);
			res.json(newAnimal);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	updateAnimal: async (req, res) => {
		const { id } = req.params;
		try {
			const [updatedRowsCount, updatedRows] = await Animal.update(req.body, {
				where: { id },
				returning: true,
			});
			if (updatedRowsCount === 0) {
				res.status(404).json({ error: 'Animal not found' });
			} else {
				res.json(updatedRows[0]);
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	deleteAnimal: async (req, res) => {
		const { id } = req.params;
		try {
			const deletedRowCount = await Animal.destroy({ where: { id } });
			if (deletedRowCount === 0) {
				res.status(404).json({ error: 'Animal not found' });
			} else {
				res.sendStatus(204);
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},
};

module.exports = AnimalController;
