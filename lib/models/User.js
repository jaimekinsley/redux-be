const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
});

schema.virtual('password').set(function(plainTextPassword) {
  const passwordHash = bcrypt.hashSync(plainTextPassword, +process.env.SALT_ROUNDS);
  this.passwordHash = passwordHash;
});

schema.statics.authorize = async function(email, password) {
  const user = await this.findOne({ email });
  if(!user) {
    const error = new Error('Invalid email/password');
    error.status = 401;
    throw error;
  }

  const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
  if(!passwordsMatch) {
    const error = new Error('Invalid email/password');
    error.status = 401;
    throw error;
  }
  return user;
};

schema.methods.authToken = function() {
  const token = jwt.sign({ sub: this.toJSON() }, process.env.APP_SECRET || 'secret', {
    expiresIn: '24h'
  });
  return token;
};

schema.statics.tokenToUser = function(token) {
  try {
    const { sub } = jwt.verify(token, process.env.APP_SECRET || 'secret');
    // turns it back to a Mongoose document, un-toJSON
    return this.hydrate(sub);
  } catch{
    const error = new Error(`Invalid or missing token: ${token}`);
    error.status = 401;
    throw error;
  }
};

module.exports = mongoose.model('User', schema);
