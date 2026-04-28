const express = require('express');
const router = express.Router();
const { authRateLimiter } = require('../middleware/rateLimiter');
const {
  validateLogin,
  validateRefresh
} = require('../middleware/validators');
const {
  createTokensController,
  refreshTokenController
} = require('../controllers/authControllers');

router.post('/', authRateLimiter, validateLogin, createTokensController);
router.post('/refresh', authRateLimiter, validateRefresh, refreshTokenController);

module.exports = router;
