const { connectDB } = require('../config/db');

const getPosts = async () => {
  const connection = await connectDB();
  const query = connection.prepare('select rowid as post_id, * from posts').all();
  return query;
};

const createPost = async (user, text) => {
  const connection = await connectDB();
  const insert = connection.prepare(`insert into posts values ('${text}', '${user}')`).all();
  return;
};

const editPost = async (user, text, id) => {
  const connection = await connectDB();
  const query = connection.prepare(`select rowid, * from posts where rowid = ${id} and posted_by = '${user}'`).get();
  if (!query){
    // throw error
    return;
  }
  connection.prepare(`update posts set post_text = '${text}' where rowid = ${id}`).all();
  return;
};

const deletePost = async (user, id) => {
  const connection = await connectDB();
  const query = connection.prepare(`select rowid, * from posts where rowid = ${id} and posted_by = '${user}'`).get();
  if (!query){
    // throw error
    return;
  }
  connection.prepare(`delete from posts where rowid = ${id}`).all();
  return;
};

module.exports = {
  getPosts,
  createPost,
  editPost,
  deletePost
}
