const { body, param, validationResult } = require('express-validator');
const { CustomError } = require('../utils/customError');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError('bad request', 400);
  }
  next();
};

// POST /auth
const validateLogin = [
  body('user')
    .isString().withMessage('invalid input')
    .trim()
    .notEmpty().withMessage('invalid input')
    .isLength({ min: 1, max: 20 })
    .matches(/^[a-zA-Z0-9_.-]+$/).withMessage('invalid input'),
  body('password')
    .isString()
    .notEmpty()
    .isLength({ min: 1, max: 20 }),
  validate
];

// POST /auth/refresh
const validateRefresh = [
  body('refresh_token')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 128, max: 128 })
    .isHexadecimal(),
  validate
];

// POST /posts
const validateCreatePost = [
  body('text')
    .isString()
    .trim()
    .notEmpty().withMessage('invalid input')
    .isLength({ min: 1, max: 1000 }).withMessage('invalid input'),
  validate
];

// PATCH /posts
const validateEditPost = [
  body('id')
    .isInt({ min: 1, }).withMessage('invalid input'),
  body('text')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 1000 }),
  validate
];

// DELETE /posts
const validateDeletePost = [
  body('id')
    .isInt({ min: 1 }),
  validate
];

module.exports = {
  validateLogin,
  validateRefresh,
  validateCreatePost,
  validateEditPost,
  validateDeletePost
};
