const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const BannerController = require('../controllers/bannerController');

// Route: GET /banners
router.get('/', authenticateToken, BannerController.getAllBanners);

// Route: GET /banners/:id
router.get('/:id', authenticateToken, BannerController.getBannerById);

// Route: POST /banners
router.post('/', authenticateToken, upload.single('imagem'), BannerController.createBanner);

// Route: PUT /banners/:id
router.put('/:id', authenticateToken, BannerController.updateBanner);

// Route: DELETE /banners/:id
router.delete('/:id', authenticateToken, BannerController.deleteBanner);

module.exports = router;
