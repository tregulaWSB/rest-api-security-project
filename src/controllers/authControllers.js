const bcrypt = require('bcrypt');
const { getUserDetails } = require('../model/users')
const { createJWT } = require('../utils/jwt')
const { asyncWrapper } = require('../utils/asyncWrapper');
const { CustomError } = require('../utils/customError');
const { logger } = require('../utils/logger');

const createToken = asyncWrapper(async (req, res) => {
  const {user, password} = req.body;
  const userDetails = await getUserDetails(user);
  const dummyHash = '7AWSpBMeqGC6SMJap3qvs9S9Gpb.4Nre5tDT7&BQyBlGKxyyTdue4M0grCv7'
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
  logger.info('Successful login', { username: user, ip: req.ip });
  const token = createJWT(user);
  res.status(200).json({'token': token});
});

module.exports = {
  createToken
}
