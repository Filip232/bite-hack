const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('../models/review');

const userSchema = new Schema({
  name: {type: String, required: true, minLength: 3, maxLength: 100},
  surname: {type: String, required: true, minLength: 3, maxLength: 100},
  username: {type: String, required: true, minLength: 5, maxLength: 100, unique: true},
  password: {type: String, required: true, minLength: 8, maxLength: 150},
  created: {type: Date, default: Date.now()},
  email: {type: String, required: true, unique: true},
  sessionToken: {type: String},
  tel: {type: String, minlength: 6, maxlength: 20},
  imagePath: {type: String, default: 'http://localhost:3000/img/defaultAvatar.png'},
  avgRating: {type: Number, default: -1},
  reservedProducts: [{type: Schema.Types.ObjectId}]
});

module.exports = mongoose.model('User', userSchema); 