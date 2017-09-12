'use strict';

const authRoutes = require('./authentication');

const routes = (app) => {
  app.use('/api/v1/auth', authRoutes);
};

module.exports = routes;
