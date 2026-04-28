const express = require('express');
const router = express.Router();
const {
  createTokensController,
  refreshTokenController
} = require('../controllers/authControllers')

router.post('/', createTokensController);
router.post('/refresh', refreshTokenController);

module.exports = router;
