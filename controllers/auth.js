const User = require('../models/User');

const register = async (req, res, next) => {
  console.log(req.body);
  const user = await User.create(req.body);
  
  res.status(201).json({
    status: 'success',
    user,
  });
};

const login = async (req, res, next) => {
  res.send('login user');
};

module.exports = {
  register,
  login,
};
