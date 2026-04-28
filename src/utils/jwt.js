const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');

const jwtSecret = process.env.JWT_secret;
const accessTokenLifetime = process.env.access_token_lifetime || '30m';
const refreshTokenLifetime = process.env.refresh_token_lifetime || 60 * 60 * 24;

const createAccessToken = (user) => {
  return jwt.sign(
    { username: user },
    jwtSecret,
    { expiresIn: accessTokenLifetime }
  );
}

const verifyAccessToken = (accessToken) => {
  try {
    return jwt.verify(accessToken, jwtSecret);
  } catch (err) {
    return null;
  }
};

const createRefreshToken = () => {
  return crypto.randomBytes(64).toString('hex');
};

const getRefreshTokenExpiry = () => {
  return Math.floor(Date.now() / 1000) + refreshTokenLifetime;
};

module.exports = {
  createAccessToken,
  verifyAccessToken,
  createRefreshToken,
  getRefreshTokenExpiry
};
