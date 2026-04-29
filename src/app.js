const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
// const fs = require('fs'); // for HTTPS
// const https = require('https'); // for HTTPS

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

// utils or models
const { logger } = require('./utils/logger');
const { deleteExpiredTokens } = require('./model/refreshTokens');

// helmet configuration for security and proper Swagger access
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

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// morgan middleware for event logging
app.use(morganMiddleware);

// global rate limiter
app.use((globalRateLimiter));

// json payload upper limit
app.use(express.json({ limit: '10kb' }));

const API_PREFIX = '/api/v1';

// Swagger route
app.use('/docs', docsRouter);
// app routes
app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/posts`, postRouter);
// any other routes
app.use((req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// error handler at the end
app.use(errorHandler);

// HTTP server
const port = process.env.PORT || 3000;
const startServer = async () => {
  await connectDB();
  logger.info('Successfully established connection to database');
  await deleteExpiredTokens();
  logger.info('Deleted all expired refresh_tokens from database');
  app.listen(port, () => 
    logger.info('Server started', { port })
  );
}

// for HTTPS
// const options = {
//     pfx: fs.readFileSync(process.env.CERTIFICATE_PATH),
//     passphrase: process.env.CERTIFICATE_PASSWORD
// };

// const port = process.env.PORT || 443;
// const startServer = async () => {
//   await connectDB();
//   logger.info('Successfully established connection to database');
//   await deleteExpiredTokens();
//   logger.info('Deleted all expired refresh_tokens from database');
//   https.createServer(options, app).listen(443, () => 
//     logger.info('Server started with HTTPS', { port: 443 })
//   );
// }

startServer();
