const {
  createTask,
  // getSprintById,
  removeTaskById,
  // updateSprintById,
} = require('../model/tasks');
const HttpCode = require('../helpers/constants');

// CREATE TASK
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

// // GET SPRINT BY ID
// const getById = async (req, res, next) => {
//   try {
//     const sprint = await getSprintById(
//       req.params.projectId,
//       req.params.sprintId,
//     );

//     if (sprint) {
//       return res
//         .status(200)
//         .json({ status: 'success', code: 200, data: { sprint } });
//     }
//     return res
//       .status(404)
//       .json({ status: 'error', code: 404, message: 'Not found' });
//   } catch (err) {
//     next(err);
//   }
// };

// REMOVE TASK BY ID
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

// // UPDATE SPRINT TITLE BY ID
// const patchTitleById = async (req, res, next) => {
//   try {
//     const projectWithId = await updateSprintById(
//       req.params.projectId,
//       req.params.sprintId,
//       req.body,
//     );
//     if (projectWithId) {
//       return res
//         .status(200)
//         .json({ status: 'success', code: 200, data: { projectWithId } });
//     }
//     return res
//       .status(404)
//       .json({ status: 'error', code: 404, message: 'Not found' });
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = {
  create,
  // getById,
  removeById,
  // patchTitleById
};
