const { DatabaseSync } = require('node:sqlite');
const dbPath = process.env.db_path;
let connection;

const connectDB = () => {
  return new Promise((resolve, reject) => {
    try {
      if (!connection){
        connection = new DatabaseSync(dbPath);
      }
      resolve(connection);
    } catch (err) {
      reject(err);
    };
  });
};

module.exports = {
  connectDB
}