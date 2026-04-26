const { DatabaseSync } = require('node:sqlite');
const dbPath = './src/sqlite/users.db'

const connectDB = () => {
  return new Promise((resolve, reject) => {
    try {
      const connection = new DatabaseSync(dbPath);
      console.log('connected')
      resolve(connection);
    } catch (err) {
      reject(err)
    }
  });
};

module.exports = {
  connectDB
}