const { verifyJWT } = require('../utils/jwt');
const { CustomError } = require('../utils/customError');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('unauthorized', 401);
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyJWT(token);

  if (!payload) {
    throw new CustomError('unauthorized', 401);
  }

  req.user = { username: payload.username };
  next();
};

module.exports = { authMiddleware };
