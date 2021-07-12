const {
  createTask,
  removeTaskById,
  patchTaskWorkingHoursByDay,
} = require('../model/tasks');
const HttpCode = require('../helpers/constants');

const create = async (req, res, next) => {
  try {
    const data = await createTask(
      req.params.projectId,
      req.params.sprintId,
      req.body,
    );

    if (data) {
      return res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        project: data,
      });
    }

    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (err) {
    next(err);
  }
};

const removeById = async (req, res, next) => {
  try {
    const data = await removeTaskById(
      req.params.projectId,
      req.params.sprintId,
      req.params.taskId,
    );

    if (data) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, project: data });
    }

    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (err) {
    next(err);
  }
};

const addWorkingHoursByDay = async (req, res, next) => {
  try {
    const tasks = await patchTaskWorkingHoursByDay(
      req.params.projectId,
      req.params.sprintId,
      req.params.taskId,
      req.body,
    );

    if (tasks) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, tasks });
    }

    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  removeById,
  addWorkingHoursByDay,
};
