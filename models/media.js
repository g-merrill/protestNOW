const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  urls: [{
    type: String,
    required: true
  }],
  story: {
    type: Schema.Types.ObjectId,
    ref: 'Story'
  }
}, {
  timestamps: true
});

const Media = mongoose.model('Media', MediaSchema);

module.exports = Media;
