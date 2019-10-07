const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  name: String,
  createdBy: String
});

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;
