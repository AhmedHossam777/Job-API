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
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      apiError.create(
        'Please provide email and password',
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(
      apiError.create('Invalid email or password', StatusCodes.UNAUTHORIZED)
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(
      apiError.create('Invalid email or password', StatusCodes.UNAUTHORIZED)
    );
  }

  const token = user.generateToken();

  res.status(StatusCodes.OK).json({
    status: 'success',
    token,
  });
};

module.exports = {
  register,
  login,
};
