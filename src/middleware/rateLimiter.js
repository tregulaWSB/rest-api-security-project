const rateLimit = require('express-rate-limit');

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: 'too many requests' },
  handler: (req, res, next, options) => {
    const { logger } = require('../utils/logger');
    logger.warn('Rate limit exceeded on /auth', {
      ip: req.ip,
      path: req.path
    });
    res.status(429).json(options.message);
  }
});

const globalRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: 'too many requests' }
});

module.exports = { 
  authRateLimiter,
  globalRateLimiter
};
