const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  posterId: {type: Schema.Types.ObjectId, required: true},
  timestamp: {type: Date, default: Date.now()},
  reviewedId: {type: Schema.Types.ObjectId, required: true},
  rating: {type: Number, required: true, min: 1, max: 5, validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
  },
  comment: {type: String, maxlength: 500}
});

module.exports = mongoose.model('Review', reviewSchema);