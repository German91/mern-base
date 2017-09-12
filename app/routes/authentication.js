'use strict';

const Router = require('express').Router();
const Authentication = require('../controllers/authentication');
const { isLogged } = require('../middlewares/isLogged');

Router.route('/signup').post(Authentication.create);
Router.route('/login').post(Authentication.login);
Router.route('/logout').get(isLogged, Authentication.logout);
Router.route('/forgot-password').post(Authentication.forgotPassword);
Router.route('/reset-password/:token').post(Authentication.resetPassword);

module.exports = Router;
