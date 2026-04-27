const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_secret;

const createJWT = (user) => {
  return jwt.sign(
    { username: user },
    jwtSecret,
    { expiresIn: process.env.JWT_lifetime }
  );
}

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    return null;
  }
};

module.exports = {
  createJWT,
  verifyJWT
}
