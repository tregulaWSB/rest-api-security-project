const bcrypt = require('bcrypt');
const { getUserDetails } = require('../model/users');
const {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteAllUserRefreshTokens
} = require('../model/refreshTokens');
const {
  createAccessToken,
  verifyAccessToken,
  createRefreshToken,
  getRefreshTokenExpiry
} = require('../utils/jwt');
const { asyncWrapper } = require('../utils/asyncWrapper');
const { CustomError } = require('../utils/customError');
const { logger } = require('../utils/logger');

const createTokensController = asyncWrapper(async (req, res) => {
  const { user, password } = req.body;
  const userDetails = await getUserDetails(user);

  const dummyHash = '7AWSpBMeqGC6SMJap3qvs9S9Gpb.4Nre5tDT7&BQyBlGKxyyTdue4M0grCv7';
  const hash = userDetails ? userDetails.password : dummyHash;
  const match = await bcrypt.compare(password, hash);

  if (!userDetails || !match) {
    logger.warn('Failed login attempt', {
      username: user,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
    throw new CustomError('unauthorized', 401)
  }

  await deleteAllUserRefreshTokens(user);
  
  const accessToken  = createAccessToken(user);
  const refreshToken = createRefreshToken();
  const expiresAt    = getRefreshTokenExpiry();
  
  await saveRefreshToken(refreshToken, user, expiresAt);

  logger.info('Successful login', { username: user, ip: req.ip });

  res.status(200).json({
    access_token: accessToken,
    refresh_token: refreshToken
  });
});

const refreshTokenController = asyncWrapper(async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    throw new CustomError('refresh token required', 400);
  }

  const stored = await findRefreshToken(refresh_token);
  const now = Math.floor(Date.now() / 1000);

  if (!stored || stored.expires_at < now) {
    if (stored) await deleteRefreshToken(refresh_token);
    logger.warn('Invalid or expired refresh token attempt', { ip: req.ip });
    throw new CustomError('unauthorized', 401);
  }

  const newRefreshToken = createRefreshToken();
  const newExpiresAt = getRefreshTokenExpiry();

  await deleteRefreshToken(refresh_token);
  await saveRefreshToken(newRefreshToken, stored.username, newExpiresAt);

  const newAccessToken = createAccessToken(stored.username);

  logger.info('Token refreshed', { username: stored.username, ip: req.ip });
  res.status(200).json({
    access_token: newAccessToken,
    refresh_token: newRefreshToken
  });
});

module.exports = {
  createTokensController,
  refreshTokenController
};
