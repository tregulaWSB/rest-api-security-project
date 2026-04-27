const express = require('express');
const app = express();

// db connection
const { connectDB } = require('./config/db');

// routers
const authRouter = require('./routes/authRoutes');

app.use(express.json());
app.use('/auth', authRouter);

const port = 80
const startServer = async () => {
  await connectDB();
  app.listen(port, () => 
    console.log(`Server is listening on http://localhost:${port}`));
}

startServer();
