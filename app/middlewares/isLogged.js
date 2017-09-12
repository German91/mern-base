'use strict';

const Jwt = require('jsonwebtoken');

exports.isLogged = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(400).send({ code: 400, status: 'error', message: 'Token not provided' });
  }

  Jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).send({ code: 401, status: 'error', message: 'Failed to authenticate token' });
    }

    if (!decoded._id) {
      return res.status(401).send({ code: 401, status: 'error', message: 'Failed to authenticate token' });
    }

    req.user = decoded;

    next();
  });
};
