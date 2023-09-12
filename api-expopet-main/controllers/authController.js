const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey, expiresIn } = require('../config/jwt');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, senha } = req.body;
    try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or senha' });
    }
    const isValidsenha = await bcrypt.compare(senha, user.senha);
    if (!isValidsenha) {
      return res.status(401).json({ error: 'Invalid email or senha' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn });
    delete user.dataValues.senha;
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Token not found' });
  }
  const [bearer, token] = authorization.split(' ');
  if (!bearer || !token) {
    return res.status(401).json({ error: 'Token malformatted' });
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.userId = payload.id;
    req.userEmail = payload.email;
    res.json({ message: 'Token verified' });
  } catch (error) {
    console.error('erro e:::: ' + error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { login, verifyToken };
