const express = require('express');
const router = express.Router();
const {
  getPostsController,
  createPostController,
  editPostController,
  deletePostController
} = require('../controllers/postControllers')

router.get('/', getPostsController);
router.post('/', createPostController);
router.patch('/', editPostController);
router.delete('/', deletePostController);

module.exports = router;
