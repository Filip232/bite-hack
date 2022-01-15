const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {type: String, required: true, minlength: 3, maxlength: 200},
  imagePaths: [{type: String, required: true, minlength: 6, maxlength: 300}],
  ownerId: {type: Schema.Types.ObjectId, required: true},
  location: {type: String, required: true},
  description: {type: String, required: true, minlength: 5, maxlength: 5000}
});

module.exports = mongoose.model('Product', productSchema);