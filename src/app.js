const express = require('express');
const app = express();

// db connection
const { connectDB } = require('./config/db');

// routers
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');

// middleware
const { morganMiddleware } = require('./middleware/morganMiddleware');
const { errorHandler } = require('./middleware/errorHandler');

// utils
const { logger } = require('./utils/logger');

app.use(morganMiddleware); 

app.use(express.json());

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use((req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandler);

const port = process.env.PORT || 3000;;
const startServer = async () => {
  await connectDB();
  app.listen(port, () => 
    logger.info('Server started', { port })
  );
}

startServer();
