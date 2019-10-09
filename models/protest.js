const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProtestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  location: String,
  creator: {
    type: String,
    required: true,
    default: 'anonymous'
  },
  stories: [{
    type: Schema.Types.ObjectId,
    ref: 'Story'
  }],
  keywords: [{
    type: String
  }]
}, {
  timestamps: true
});

const Protest = mongoose.model('Protest', ProtestSchema);

module.exports = Protest;
