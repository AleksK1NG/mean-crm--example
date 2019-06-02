const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  category: {
    ref: 'Category',
    type: mongoose.Schema.Types.ObjectId
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('Position', positionSchema);
