const {
  getPosts,
  createPost,
  editPost,
  deletePost
} = require('../model/posts')
const { asyncWrapper } = require('../utils/asyncWrapper');

const getPostsController = asyncWrapper(async (req, res) => {
  const posts = await getPosts();
  res.status(200).json(posts)
});

const createPostController = asyncWrapper(async (req, res) => {
  const user = req.user.username;
  const { text } = req.body;
  await createPost(user, text);
  res.status(201).json({ msg: 'Post created successfully' });
});

const editPostController = asyncWrapper(async (req, res) => {
  const user = req.user.username;
  const { text, id } = req.body;
  await editPost(user, text, id);
  res.status(200).json({ msg: `Post ${id} edited successfully` });
});

const deletePostController = asyncWrapper(async (req, res) => {
  const user = req.user.username;
  const { id } = req.body;
  await deletePost(user, id);
  res.status(200).json({ msg: `Post ${id} deleted successfully` });
});

module.exports = {
  getPostsController,
  createPostController,
  editPostController,
  deletePostController
}
