const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  RegistrationNo:{
    type:String,
    required: true
  },
  Name:{
    type:String,
    required:true,
    trim:true,
  },
  mobileNumber:{
    type:String,
    required: true,
   
  },
  email:{
    type:String,
    required: true,
    unique: true,

  },
  State:{
    type:String,
    required:true,
    trim:true,
  },
  City:{
    type:String,
    required:true,
    trim:true,
  },
  DeAddictionCenter:{
    type:String,
    required:true,
    trim:true,
  },
  DateOfRegistration: {
    type:Date,
    required:true,
    trim:true,
  },
  TypeOfDrug:{
    type:String,
    required:true,
    trim:true,
  },
 
  addictionPeriod: {
    type: Number,
    min: 0 
  },
  Medication:{
    type:String,
    required:true,
    trim:true,
  },
  
  RecovringStatus: {
    type: String,
    enum : ['Active','Recovered'],
    default: 'Active', 
    required: true,
  },
  ProvidedBeneficiary: {
    type: String,
    required: true,
  },

});

const AddictionInfo = mongoose.model('PersonSchema', PersonSchema);

module.exports = AddictionInfo;
