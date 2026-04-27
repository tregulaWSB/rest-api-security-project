const bcrypt = require('bcrypt');
const {
  getUserDetails
} = require('../model/users')
const {
  createJWT
} = require('../utils/jwt')

const createToken = async (req, res) => {
  const {user, password} = req.body;
  const userDetails = await getUserDetails(user);
  if (!userDetails) {
    res.status(401).json({'msg': 'unauthorized'});
    return;
  }
  const hash = userDetails.password;
  bcrypt.compare(password, hash, function(err, result) {
    if (result) {
      const token = createJWT(user)
      res.status(200).json({'msg': 'ok', 'token': token});
    } else {
      res.status(401).json({'msg': 'unauthorized'});
    }
  });
};

module.exports = {
  createToken
}
