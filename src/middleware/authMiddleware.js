const {
  verifyJWT
} = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyJWT(token);

  if (!payload) {
    return res.status(401).json({ msg: 'unauthorized' });
  }

  req.user = { user: payload.user };
  next();
};

module.exports = { authMiddleware };
