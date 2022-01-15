const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {type: String, required: true, minlength: 3, maxlength: 200},
  imagePath: {type: String, minlength: 6, maxlength: 300},
  ownerId: {type: Schema.Types.ObjectId, required: true},
  location: {type: String, required: true}
});
