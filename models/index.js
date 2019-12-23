const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/protestNOW';

mongoose.connect(DB_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

module.exports = {
  User: require('./user'),
  Protest: require('./protest'),
  Story: require('./story'),
  Media: require('./media')
}
