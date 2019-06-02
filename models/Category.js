const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('Category', categorySchema);
