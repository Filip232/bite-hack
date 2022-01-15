const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, minLength: 3, maxLength: 100},
  password: {type: String, required: true, minLength: 8, maxLength: 150},
  created: {type: Date, default: Date.now()},
  email: {type: String},
  sessionToken: {type: String},
  products: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('User', userSchema); 