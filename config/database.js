const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('connected', () => {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
