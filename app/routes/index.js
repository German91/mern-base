'use strict';

const defaultRoutes = require('./defaults');

const routes = (app) => {
  app.use('/api/v1/test', defaultRoutes);
};

module.exports = routes;
