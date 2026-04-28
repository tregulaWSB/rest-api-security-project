const { connectDB } = require('../config/db');
const { CustomError } = require('../utils/customError');

const getPosts = async () => {
  const connection = await connectDB();
  const query = connection.prepare('select rowid as post_id, * from posts').all();
  return query;
};

const createPost = async (user, text) => {
  const connection = await connectDB();
  const insert = connection.prepare('insert into posts values (?, ?)').run(text, user);
  return;
};

const editPost = async (user, text, id) => {
  const connection = await connectDB();
  const query = connection.prepare('select rowid, * from posts where rowid = ? and posted_by = ?').get(id, user);
  const compareQuery = connection.prepare('select rowid, * from posts where rowid = ?').get(id);
  if (!compareQuery){
    throw new CustomError('post not found', 404);
  }
  else if (!query) {
    throw new CustomError('forbidden', 403);
  }
  connection.prepare('update posts set post_text = ? where rowid = ? and posted_by = ?').run(text, id, user);
  return;
};

const deletePost = async (user, id) => {
  const connection = await connectDB();
  const query = connection.prepare('select rowid, * from posts where rowid = ? and posted_by = ?').get(id, user);
  const compareQuery = connection.prepare('select rowid, * from posts where rowid = ?').get(id);
  if (!compareQuery){
    throw new CustomError('post not found', 404);
  }
  else if (!query) {
    throw new CustomError('forbidden', 403);
  }
  connection.prepare('delete from posts where rowid = ? and posted_by = ?').run(id, user);
  return;
};

module.exports = {
  getPosts,
  createPost,
  editPost,
  deletePost
};
