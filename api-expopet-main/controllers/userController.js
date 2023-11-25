const bcrypt = require('bcrypt');
const User = require('../models/User');

// Controller methods
const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createUser: async (req, res) => {
    const { nome, email, telefone, senha } = req.body;
    if (senha.length < 6) {
      return res.status(400).json({ error: 'A senha precisa ter no mínimo 6 caracteres.' });
    }

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
      let senhaHash = await bcrypt.hash(senha, 10);
      const newUser = await User.create({ nome, email, telefone, senha: senhaHash });
      res.status(201).json(newUser);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ error: 'Email já cadastrado' });
        res.status(500).json({ error: 'Erro ao realizar cadastro' });
      }
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, senha } = req.body;
    try {
      const user = await User.findByPk(id);
      if (user) {
        user.nome = nome;
        user.email = email;
        user.telefone = telefone;
        user.senha = senha;
        await user.save();
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = UserController;
