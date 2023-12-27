const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  
  state:{
    type: String,
    required: true
  },
  
  Qualifications: {
    type: String,
    required: true
  },
  
  Description:{
    type: String,
    required: true
  },
  
  contact: {
    type: String,
    required: true
  }
});

const Expert = mongoose.model('Expert', expertSchema);

module.exports = Expert;
