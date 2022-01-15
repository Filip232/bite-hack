const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://hackathon-admin:fY7eAs42rcHkB2@cluster0.cen12.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const Schema = mongoose.Schema;

const user = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  created: Date.now(),
  email: {type: String},
  sessionToken: {type: String}
});

const User = mongoose.model('User', user);