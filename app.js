const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const limiter = require('./helpers/limiter');
const HttpCode = require('./helpers/constants');
const projectsRouter = require('./routes/api/projects/projects');
const userRouter = require('./routes/api/users/index');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());
app.use(limiter);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 15000 }));

app.use('/api/users', userRouter);
app.use('/api/projects', projectsRouter);

app.use((_req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  const status = err.status ? 'error' : 'fail';
  const statusCode = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  res
    .status(statusCode)
    .json({ status, code: statusCode, message: err.message });
});

module.exports = app;
