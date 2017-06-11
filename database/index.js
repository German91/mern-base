const mongoose = require('mongoose');
const config = require('../config');

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI);

// Handle Errors
mongoose.connection.on('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('close', () => {
  console.log('Error connecting to MongoDB');
});
