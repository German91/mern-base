'use strict';

const Router = require('express').Router();
const Defaults = require('../controllers/defaults');

Router.route('/').get(Defaults.showMessage);

module.exports = Router;
