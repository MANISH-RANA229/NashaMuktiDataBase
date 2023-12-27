const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  Name:{
    type:String,
    required:true,
    trim:true,
  },
  City:{
    type:String,
    required:true,
    trim:true,
  },
  State:{
    type:String,
    required:true,
    trim:true,
  },
  RegisteredUsers:{
    type:Number,
    required:true,
    trim:true,
  },
  ActiveUsers:{
    type:Number,
    required:true,
    trim:true,
  },
  RecoveredUsers:{
    type:Number,
    required:true,
    trim:true,
  },
 
  
});

const Center = mongoose.model('Center', centerSchema);

module.exports = Center;
