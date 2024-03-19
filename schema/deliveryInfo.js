const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  email: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  schedule: {
    type: String,
    required: true
  },
  fromCity: {
    type: String,
    required: true
  },
  toCity: {
    type: String,
    required: true,
    trim: true
  },
  deliveryMethod: {
    type: String,
    required: true,
    trim: true
  },
  
  message: {
    type: String,
    required: true,
    trim: true
  }
});

const deliveryuserdata = mongoose.model('deliveryuserdata', userSchema);

module.exports = deliveryuserdata;
