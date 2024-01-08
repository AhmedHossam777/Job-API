const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const apiError = require('../errors/apiError');

const register = async (req, res, next) => {
  const user = await User.create(req.body);

  const token = user.generateToken();

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    user,
    token,
  });
};

const login = async (req, res, next) => {
  res.send('login user');
};

module.exports = {
  register,
  login,
};
