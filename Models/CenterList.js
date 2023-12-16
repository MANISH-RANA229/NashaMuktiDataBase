const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  centerName:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  
  state:{
    type: String,
    required: true
  },
  
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String
    }
  ]
});

const Center = mongoose.model('Center', centerSchema);

module.exports = Center;
