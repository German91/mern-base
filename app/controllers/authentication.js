'use strict';

const User = require('../models/User');
const Jwt = require('jsonwebtoken');
const { sendMail } = require('../utils/email');

/**
 * Create new account
 * @param  {String}   email     User's email
 * @param  {String}   password  User's password
 * @param  {Array}    roles     User's roles
 * @param  {String}   username  User's username
 * @return {Response}
 */
exports.create = async (req, res, next) => {
  const data = req.body;

  try {
    let user = new User(data);

    await user.save();
    let token = await Jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

    res
      .header('Authorization', token)
      .status(202)
      .send({ code: 202, status: 'success', message: 'Accounts successfully created', token });
  } catch (err) {
    res.status(400).send({ code: 200, status: 'error', message: err });
  }
};

/**
 * Login user
 * @param  {String}   email      User's email
 * @param  {String}   password   User's password
 * @param  {String}   username   User's username
 * @return {Response}
 */
exports.login = (req, res, next) => {
  const data = req.body;

  if (!data.email && !data.username) {
    return res.status(400).send({ code: 400, status: 'error', message: 'Email Address or username is required' });
  }

  if (!data.password) {
    return res.status(400).send({ code: 400, status: 'error', message: 'Email Address is required' });
  }

  // Find user by email or username
  User
    .findOne({ $or: [{ email: data.email }, { username: data.username }] })
    .select('+password')
    .exec(function (err, user) {
      if (err) return next(err);

      if (!user) {
        return res.status(404).send({ code: 404, status: 'error', message: 'User not found' });
      }

      // Check if the password is correct
      user.comparePassword(data.password, function (err, isMatch) {
        if (err) return next(err);

        if (!isMatch) {
          return res.status(400).send({ code: 400, status: 'error', message: 'Email/Username or password is incorrect' });
        }

        let token = Jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res
          .header('Authorization', token)
          .status(200)
          .send({ code: 200, status: 'success', token });
      });
    });
};

/**
 * Send email with token and url to reset password
 * @param  {String}   email User's email
 * @return {Response}
 */
exports.forgotPassword = async (req, res, next) => {
  const email = req.body['email'];

  try {
    let user = await User.findOne({ email });
    let token = await Jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    let url = `${process.env.ROOT_URL}/reset-password/${token}`;

    await sendMail({ email, url }, 'Forgot Password', 'forgotPassword');

    res.status(200).send({ code: 200, status: 'success', message: 'Check your email in order to reset your password' });
  } catch (err) {
    res.status(400).send({ code: 400, status: 'error', message: err });
  }
};

/**
 * Reset Password
 * @param  {String} password    New Password
 * @param  {String} token       Auth token
 * @return {Response}
 */
exports.resetPassword = async (req, res, next) => {
  const password = req.body['password'];
  const token = req.params['token'];

  try {
    let decoded = await Jwt.verify(token, process.env.SECRET_KEY);
    let user = await User.findById(decoded._id);

    user.password = password;
    await user.save();

    res.status(200).send({ code: 200, status: 'success', message: 'Password successfully updated' });
  } catch (err) {
    res.status(400).send({ code: 400, status: 'error', message: err });
  }
};

/**
 * Get current user profile
 * @return {Object}  User profile
 */
exports.profile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);

    res.status(200).send({ code: 200, status: 'success', user });
  } catch (err) {
    res.status(400).send({ code: 400, status: 'error', message: err });
  }
};

/**
 * Logout User
 * @return {Response}
 */
exports.logout = (req, res, next) => {
  req.user = undefined;

  res.status(200).send({ code: 200, status: 'success', message: 'Logged out' });
};
