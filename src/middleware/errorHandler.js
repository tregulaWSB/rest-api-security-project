const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CustomError') {
    logger.warn(err.message, {
      statusCode: err.statusCode,
      method: req.method,
      path: req.path
    });
    return res.status(err.statusCode).json({ msg: err.message });
  }
  logger.error('Unhandled error', {
    method: req.method,
    path: req.path,
    error: err.message,
    stack: err.stack
  });
  return res.status(500).json({ msg: 'internal server error' });
};

module.exports = { errorHandler };
