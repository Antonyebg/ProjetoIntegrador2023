const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); 

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/animals', animalRoutes);

// Sync models with the database and start the server
sequelize
	.sync()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});
