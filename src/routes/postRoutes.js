const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  getPostsController,
  createPostController,
  editPostController,
  deletePostController
} = require('../controllers/postControllers')

router.get('/', getPostsController);
router.post('/', authMiddleware, createPostController);
router.patch('/', authMiddleware, editPostController);
router.delete('/', authMiddleware, deletePostController);

module.exports = router;
