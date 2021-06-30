const {
  getAllPojects,
  getProjectById,
  createProject,
  updateProject,
  removeProject,
} = require('../model/projects');
const HttpCode = require('../helpers/constants');

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { projects, total, limit, offset } = await getAllPojects(
      userId,
      req.query
    );
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        total,
        limit,
        offset,
        projects,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectWithId = await getProjectById(userId, req.params.projectId);
    if (projectWithId) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { projectWithId },
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

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const project = await createProject({ ...req.body, team: userId });
    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, data: { project } });
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = HttpCode.BAD_REQUEST;
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectWithId = await updateProject(
      userId,
      req.params.projectId,
      req.body
    );
    if (projectWithId) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { projectWithId },
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

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectWithId = await removeProject(userId, req.params.projectId);
    if (projectWithId) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { projectWithId },
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

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};