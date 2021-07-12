const rateLimit = require('express-rate-limit');
const HttpCode = require('./constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  handler: (_req, res) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Too many requests, please try again later',
    });
  },
});

module.exports = limiter;
