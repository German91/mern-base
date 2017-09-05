'use strict';

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

let db = mongoose.connection;

// Handle Errors
db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('close', () => {
  console.log('Error connecting to MongoDB');
});
