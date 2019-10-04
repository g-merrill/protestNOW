const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: String,
  lastInitial: String,
  password: { type: String, required: true }
}, {
  timestamps: true
});

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
