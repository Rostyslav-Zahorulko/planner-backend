const {
  createSprint,
  getSprintById,
  removeSprintById,
  updateSprintById,
} = require('../model/sprints');

const create = async (req, res, next) => {
  try {
    const data = await createSprint(req.params.projectId, req.body);
    if (data) {
      return res.status(200).json({ status: 'success', code: 200, data });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (err) {
    next(err);
  }
};

// GET SPRINT BY ID
const getById = async (req, res, next) => {
  try {
    const data = await getSprintById(req.params.projectId, req.params.sprintId);

    if (data) {
      return res.status(200).json({ status: 'success', code: 200, data });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
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
        .status(200)
        .json({ status: 'success', code: 200, data: data.sprints });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
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
      return res.status(200).json({ status: 'success', code: 200, data });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, getById, removeById, patchTitleById };
