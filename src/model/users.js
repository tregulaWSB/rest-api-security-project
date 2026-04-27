const { connectDB } = require('../config/db');

const getUserDetails = async (user) => {
  const connection = await connectDB();
  const query = connection.prepare('select * from users where name = ?').get(user);
  return query;
};

module.exports = {
  getUserDetails
}
