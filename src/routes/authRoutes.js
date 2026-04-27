const express = require('express');
const router = express.Router();
const {
  createToken
} = require('../controllers/authControllers')

router.post('/', createToken);

module.exports = router;
