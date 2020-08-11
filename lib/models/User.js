const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  profileImage: String
});

schema.virtual('password').set(function(plainTextPassword){
  const passwordHash = bcrypt.hashSync(plainTextPassword, +process.env.SALT_ROUNDS);
  this.passwordHash = passwordHash;
});

module.exports = mongoose.model('User', schema);
