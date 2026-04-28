const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

// db connection
const { connectDB } = require('./config/db');

// routers
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const docsRouter = require('./routes/docsRoutes');

// middleware
const { morganMiddleware } = require('./middleware/morganMiddleware');
const { errorHandler } = require('./middleware/errorHandler');
const { globalRateLimiter } = require('./middleware/rateLimiter');

// utils/models
const { logger } = require('./utils/logger');
const { deleteExpiredTokens } = require('./model/refreshTokens')

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc:  ["'self'", "'unsafe-inline'"],
      imgSrc:    ["'self'", "data:"],
      fontSrc:   ["'self'", "data:"],
      connectSrc:["'self'"],
      frameAncestors: ["'self'"] 
    }
  },
  crossOriginResourcePolicy: { policy: 'same-origin' }
}));
app.disable('x-powered-by');

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morganMiddleware);

app.use((globalRateLimiter));

app.use(express.json({ limit: '10kb' }));

const API_PREFIX = '/api/v1';

app.use('/docs', docsRouter);
app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/posts`, postRouter);

app.use((req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandler);

const port = process.env.PORT || 3000;;
const startServer = async () => {
  await connectDB();
  logger.info('Successfully established connection to database');
  await deleteExpiredTokens();
  logger.info('Deleted all expired refresh_tokens from database')
  app.listen(port, () => 
    logger.info('Server started', { port })
  );
}

startServer();
