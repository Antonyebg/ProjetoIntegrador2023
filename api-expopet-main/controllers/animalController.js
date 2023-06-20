const Animal = require('../models/Animal');

// Controller methods
const AnimalController = {
	getAllAnimals: async (req, res) => {
		try {
			const animals = await Animal.findAll();
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
			const { nome, cordosolhos, cor, porte, sexo, bairro, imagem } = req.body;
			const newAnimal = await Animal.create({
				nome,
				cordosolhos,
				cor,
				porte,
				sexo,
				bairro,
				imagem,
			});
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
