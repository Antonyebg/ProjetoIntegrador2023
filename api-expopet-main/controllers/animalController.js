const fs = require('fs');
const cloudinary = require('../upload/local-asset.js'); //
const multer = require('multer');
const Animal = require('../models/Animal');

// Controller methods
const AnimalController = {
	getAllAnimals: async (req, res) => {
		try {
			const { cor, porte, corDosOlhos, bairro, sexo, temDono, animalPerdido, paraAdocao } = req.query;

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

			if (temDono) {
				whereClause.tem_dono = temDono === 'true';
			}

			if (animalPerdido) {
				whereClause.animal_perdido = animalPerdido === 'true';
			}

			if (paraAdocao) {
				whereClause.para_adocao = paraAdocao === 'true';
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
			const { nome, cordosolhos, cor, porte, sexo, bairro, tem_dono, animal_perdido, para_adocao } = req.body;
			const imagem = req.file;

			const cloudinaryResponse = await cloudinary.uploader.upload(imagem.path, {
				folder: "pets"
			});

			const newAnimal = await Animal.create({
				nome,
				cordosolhos,
				cor,
				porte,
				sexo,
				bairro,
				tem_dono, 
				animal_perdido,
				para_adocao,
				user_id: req.user.id,
				imagem: cloudinaryResponse.secure_url,
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
