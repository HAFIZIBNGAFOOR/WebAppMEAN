const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email:{
    type : String,
    required: 'Email can\'t be empty',
    unique: true
  },
  password:{
    type:String,
    required: 'Password can\'t be empty'
  }
})

mongoose.model('Admin',adminSchema);
