const fs = require('fs');
const cloudinary = require('../upload/local-asset.js'); //
const multer = require('multer');
const Banner = require('../models/Banner');

// Controller methods
const BannerController = {
	getAllBanners: async (req, res) => {
		try {
			const banners = await Banner.findAll({});
			res.json(banners);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	getBannerById: async (req, res) => {
		const { id } = req.params;
		try {
			const banner = await Banner.findByPk(id);
			if (banner) {
				res.json(banner);
			} else {
				res.status(404).json({ error: 'Banner not found' });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	createBanner: async (req, res) => {
		try {
			const { nome } = req.body;
			const imagem = req.file;

			const cloudinaryResponse = await cloudinary.uploader.upload(imagem.path, {
				folder: "banners"
			});

			const newBanner = await Banner.create({
				nome,
				imagem: cloudinaryResponse.secure_url,
			});

			fs.unlinkSync(imagem.path);
			res.json(newBanner);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	updateBanner: async (req, res) => {
		const { id } = req.params;
		try {
			const [updatedRowsCount, updatedRows] = await Banner.update(req.body, {
				where: { id },
				returning: true,
			});
			if (updatedRowsCount === 0) {
				res.status(404).json({ error: 'Banner not found' });
			} else {
				res.json(updatedRows[0]);
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	deleteBanner: async (req, res) => {
		const { id } = req.params;
		try {
			const deletedRowCount = await Banner.destroy({ where: { id } });
			if (deletedRowCount === 0) {
				res.status(404).json({ error: 'Banner not found' });
			} else {
				res.sendStatus(204);
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},
};

module.exports = BannerController;
