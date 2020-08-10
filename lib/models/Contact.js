const mongoose = require('mongoose');

const schema = new mongoose.Schema({
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
