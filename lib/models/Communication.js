const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  contacted: [{
    date: {
      type: Date,
      required: true
    },
    method: {
      type: String,
      required: true,
      enum: ['LinkedIn', 'email', 'phone', 'slack', 'zoom']
    },
    notes: {
      type: String,
      required: true
    },
    nextSteps: {
      type: String
    }
  }]
});

module.exports = mongoose.model('Communication', schema);
