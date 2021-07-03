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

// GET SPRINT BY ID
const getById = async (req, res, next) => {
  try {
    const data = await getSprintById(req.params.projectId, req.params.sprintId);

    if (data) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data });
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

// REMOVE SPRINT BY ID
const removeById = async (req, res, next) => {
  try {
    const data = await removeSprintById(
      req.params.projectId,
      req.params.sprintId,
    );
    if (data) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: data.sprints });
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

// UPDATE SPRINT TITLE BY ID
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
        .json({ status: 'success', code: HttpCode.OK, data });
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

module.exports = { create, getById, removeById, patchTitleById };
