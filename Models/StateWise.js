const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
    
  StateName:{
    type:String,
    required:true,
    trim:true,
  },
  NoOfCenters:{
    type:String,
    required:true,
    trim:true,
  },
 
  TotalUsers:{
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

const Center = mongoose.model('Statedata',StateSchema);

module.exports = Center;