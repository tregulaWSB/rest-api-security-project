const express = require('express');
const { connectDB } = require('./config/db');

const app = express();

let connection;

const port = 80
const startServer = async () => {
  connection = await connectDB();
  app.listen(port, () => 
    console.log(`Server is listening on http://localhost:${port}`));
}

startServer();