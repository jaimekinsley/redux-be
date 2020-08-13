const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  communicationMedium: {
    type: [String],
    required: true,
    enum: ['LinkedIn', 'email', 'phone', 'slack']
  },
  imageUrl: {
    type: String
  }
},
{
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
    }
  },
  toObject: {
    virtuals: true
  }
});

schema.virtual('communication', {
  ref: 'Communication',
  localField: '_id',
  foreignField: 'contact'
});

module.exports = mongoose.model('Contact', schema);
