const {
  getPosts,
  createPost,
  editPost,
  deletePost
} = require('../model/posts')

const getPostsController = async (req, res) => {
  const posts = await getPosts();
  res.status(200).json(posts)
};

const createPostController = async (req, res) => {
  const user = req.user.user;
  const { text } = req.body;
  await createPost(user, text);
  res.status(201).json({'msg': 'ok'});
};

const editPostController = async (req, res) => {
  const user = req.user.user;
  const { text, id } = req.body;
  await editPost(user, text, id);
  res.status(200).json({'msg': 'ok'});
};

const deletePostController = async (req, res) => {
  const user = req.user.user;
  const { id } = req.body;
  await deletePost(user, id);
  res.status(200).json({'msg': 'ok'});
};

module.exports = {
  getPostsController,
  createPostController,
  editPostController,
  deletePostController
}
