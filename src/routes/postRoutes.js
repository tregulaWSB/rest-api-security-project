const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  validateCreatePost,
  validateEditPost,
  validateDeletePost,
} = require('../middleware/validators')
const {
  getPostsController,
  createPostController,
  editPostController,
  deletePostController
} = require('../controllers/postControllers')

router.get('/', getPostsController);
router.post('/', authMiddleware, validateCreatePost, createPostController);
router.patch('/', authMiddleware, validateEditPost, editPostController);
router.delete('/', authMiddleware, validateDeletePost, deletePostController);

module.exports = router;
