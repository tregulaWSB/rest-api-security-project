const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_secret;

const createJWT = (user) => {
  const token = jwt.sign({
    user: user
  },
  jwtSecret,
  {expiresIn: process.env.JWT_lifetime}
  )
  return token;
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
