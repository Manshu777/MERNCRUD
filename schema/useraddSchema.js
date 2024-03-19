const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },

}, { timestamps: true });

const sigupuser = mongoose.model('sigupuser', userSchema);


module.exports = sigupuser
