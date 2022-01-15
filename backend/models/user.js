const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true, minLength: 3, maxLength: 100},
  surname: {type: String, required: true, minLength: 3, maxLength: 100},
  username: {type: String, required: true, minLength: 5, maxLength: 100, unique: true},
  password: {type: String, required: true, minLength: 8, maxLength: 150},
  created: {type: Date, default: Date.now()},
  email: {type: String, required: true, unique: true},
  sessionToken: {type: String},
  tel: {type: String, minlength: 6, maxlength: 20}
});

userSchema
  .virtual('getProducts')
  .get( () => {
    return this.products;
  });


module.exports = mongoose.model('User', userSchema); 