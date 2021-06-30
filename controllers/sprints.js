const {
  createSprint,
  getAllSprints,
  getSprintById,
  removeSprintById,
  updateSprintById,
} = require('../model/sprints');

const create = async (req, res, next) => {
  try {
    const updatedProject = await createSprint(req.params.projectId, req.body);
    if (updatedProject) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { updatedProject } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (err) {
    next(err);
  }
};

// GET ALL SPRINTS AND PROJECT INFORMATION
const getAll = async (req, res, next) => {
  try {
    const project = await getAllSprints(req.params.projectId);
    const [{ sprints, id, title, description, team }] = project;

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        sprints,
        projectInfo: { id, title, description, team },
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET SPRINT BY ID
const getById = async (req, res, next) => {
  try {
    const sprint = await getSprintById(
      req.params.projectId,
      req.params.sprintId,
    );

    if (sprint) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { sprint } });
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
    const result = await removeSprintById(
      req.params.projectId,
      req.params.sprintId,
    );
    if (result) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { result } });
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
    const projectWithId = await updateSprintById(
      req.params.projectId,
      req.params.sprintId,
      req.body,
    );
    if (projectWithId) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { projectWithId } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, getAll, getById, removeById, patchTitleById };
