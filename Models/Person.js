const mongoose = require('mongoose');

const addictionInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true,
    trim:true,
  },
  
  city:{
    type:String,
    required:true,
    trim:true,
  },
  state:{   
    type:String,
    required:true,
    trim:true,
  },
  age: {
    type: Number,
    min: 15 
  },
  addictionPeriod: {
    type: Number,
    min: 0 
  },
  mobileNumber:{
    type:String,
    required: true,
    unique: true,
  },

});

const AddictionInfo = mongoose.model('AddictionInfo', addictionInfoSchema);

module.exports = AddictionInfo;
