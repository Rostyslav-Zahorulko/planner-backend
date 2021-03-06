const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const limiter = require('./helpers/limiter');
const HttpCode = require('./helpers/constants');

const userRouter = require('./routes/api/users/index');
const projectsRouter = require('./routes/api/projects/projects');
const sprintsRouter = require('./routes/api/sprints/sprints');
const tasksRouter = require('./routes/api/tasks/tasks');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());
app.use(limiter);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 15000 }));

app.use('/users', userRouter);
app.use('/projects', projectsRouter);
app.use('/projects', sprintsRouter);
app.use('/projects', tasksRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
