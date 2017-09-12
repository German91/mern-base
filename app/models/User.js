'use strict';

const Mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');
const Timestamps = require('mongoose-timestamps');
const Schema = Mongoose.Schema;
const Bcrypt = require('bcrypt');

let UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    minLength: 3,
    maxLength: 100,
    required: 'The username is required',
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'The email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },

  password: {
    type: String,
    minLength: 6,
    required: 'The password is required',
    select: false,
  },

  roles: {
    type: [String],
    enum: ['SUPER-ADMIN', 'ADMIN', 'USER', 'GUEST'],
    default: 'USER',
    required: 'The role is required',
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    required: false,
  },
});

UserSchema.methods.comparePassword = function (plainPassword, callback) {
  let user = this;

  Bcrypt.compare(plainPassword, user.password, function (err, isMatch) {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

UserSchema.pre('save', function (next) {
  let user = this;

  if (!user.isModified('password')) return next();

  Bcrypt.genSalt(15, function (err, salt) {
    if (err) return next(err);

    Bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;

      next();
    });
  })
});

let User = Mongoose.model('User', UserSchema, 'users');

module.exports = User;
