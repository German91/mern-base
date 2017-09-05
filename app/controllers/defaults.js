'use strict';

exports.showMessage = (req, res, next) => {
  res.status(200).json({ message: 'Hello Express' });
};
