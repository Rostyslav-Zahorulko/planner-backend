const {
  createSprint,
  getSprintById,
  removeSprintById,
  updateSprintById,
} = require('../model/sprints');
const HttpCode = require('../helpers/constants');

const create = async (req, res, next) => {
  try {
    const data = await createSprint(req.params.projectId, req.body);

    if (data) {
      return res
        .status(HttpCode.CREATED)
        .json({ status: 'success', code: HttpCode.CREATED, data });
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

const getById = async (req, res, next) => {
  try {
    const sprint = await getSprintById(
      req.params.projectId,
      req.params.sprintId,
    );

    if (sprint) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, sprint });
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
    const data = await removeSprintById(
      req.params.projectId,
      req.params.sprintId,
    );

    if (data) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, sprints: data.sprints });
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

const patchTitleById = async (req, res, next) => {
  try {
    const data = await updateSprintById(
      req.params.projectId,
      req.params.sprintId,
      req.body,
    );

    if (data) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, sprint: data });
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
  getById,
  removeById,
  patchTitleById,
};
