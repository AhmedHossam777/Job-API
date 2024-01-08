const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: 50,
    minlength: 1,
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  token: {
    type: String,
    select: false,
  },
});

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10); // 10 is salt
  next();
});



UserSchema.methods.generateToken = function () {
  this.token = jwt.sign(
    {
      // payload
      id: this._id,
      name: this.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
  return this.token;
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
