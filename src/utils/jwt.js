const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_secret;

const createJWT = (user) => {
  const token = jwt.sign({
    user: user
  },
  jwtSecret,
  {expiresIn: '1m'}
  )
  return token;
}

const verifyJWT = (token) => {
  jwt.verify(token, jwtSecret);
  return;
}

module.exports = {
  createJWT,
  verifyJWT
}
