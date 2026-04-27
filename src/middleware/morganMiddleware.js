const morgan = require('morgan');
const { logger } = require('../utils/logger');

const stream = {
  write: (message) => logger.http(message.trim())
};

const morganMiddleware = morgan(
  ':remote-addr :method :url :status :response-time ms',
  { stream }
);

module.exports = { morganMiddleware };
