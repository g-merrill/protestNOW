const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  protest: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Protest'
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // media: [{
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Media'
  // }],
  photoUrl: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    required: true,
    default: 'am here'
  },
  entry: {
    type: String,
    required: true,
  },
  genUrl: {
    type: String
  },
  keywords: [{
    type: String
  }]
}, {
  timestamps: true
});

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;
