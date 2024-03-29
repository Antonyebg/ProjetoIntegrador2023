const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const AnimalController = require('../controllers/animalController');

// Route: GET /animals
router.get('/', authenticateToken, AnimalController.getAllAnimals);

// Route: GET /animals/:id
router.get('/:id', authenticateToken, AnimalController.getAnimalById);

// Route: POST /animals
router.post('/', authenticateToken, upload.single('imagem'), AnimalController.createAnimal);

// Route: PUT /animals/:id
router.put('/:id', authenticateToken, AnimalController.updateAnimal);

// Route: DELETE /animals/:id
router.delete('/:id', authenticateToken, AnimalController.deleteAnimal);

module.exports = router;
