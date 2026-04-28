const { connectDB } = require('../config/db');
const { CustomError } = require('../utils/customError');

const saveRefreshToken = async (token, username, expiresAt) => {
  const db = await connectDB();
  db.prepare('insert into refresh_tokens (token, username, expires_at, created_at) values (?, ?, ?, ?)').run(token, username, expiresAt, Math.floor(Date.now() / 1000));
};

const findRefreshToken = async (token) => {
  const db = await connectDB();
  return db.prepare('select * FROM refresh_tokens where token = ?').get(token);
};

const deleteRefreshToken = async (token) => {
  const db = await connectDB();
  db.prepare('delete from refresh_tokens where token = ?').run(token);
};

const deleteExpiredTokens = async () => {
  const db = await connectDB();
  const now = Math.floor(Date.now() / 1000);
  db.prepare('delete from refresh_tokens where expires_at < ?').run(now);
};

const deleteAllUserRefreshTokens = async (user) => {
  const db = await connectDB();
  db.prepare('delete from refresh_tokens where username = ?').run(user);
};

module.exports = {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteExpiredTokens,
  deleteAllUserRefreshTokens
};
