const express = require('express');
const router = express.Router();
const {
  getAllPojects,
  getProjectById,
  createProject,
  updateProject,
  removeProject,
  createSprint,
  getAllSprints,
  getSprintById,
  removeSprintById,
  updateSprintById,
} = require('../../model/projects');
const {
  validateCreateProject,
  validateUpdateProject,
} = require('./validation');

router.get('/', async (_req, res, next) => {
  try {
    const projects = await getAllPojects();
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        projects,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:projectId', async (req, res, next) => {
  try {
    const projectWithId = await getProjectById(req.params.projectId);
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
});

router.post('/', validateCreateProject, async (req, res, next) => {
  try {
    const project = await createProject(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { project } });
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    next(err);
  }
});

router.patch('/:projectId', validateUpdateProject, async (req, res, next) => {
  try {
    const projectWithId = await updateProject(req.params.projectId, req.body);
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
});

router.delete('/:projectId', async (req, res, next) => {
  try {
    const projectWithId = await removeProject(req.params.projectId);
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
});

// CREATE SPRINT
// ФОРМАТ ДЖЕЙСОНА ДЛЯ ЗАПРОСА
// {
//     "title": "test sprint 5",
//     "duration": 10,
//     "startDate": "December 17, 1995 03:24:00"
// }
router.post('/:projectId/sprints', async (req, res, next) => {
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
});

// GET ALL SPRINTS AND PROJECT INFORMATION

router.get('/:projectId/sprints/', async (_req, res, next) => {
  try {
    const project = await getAllSprints();
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
});

// GET SPRINT BY ID

router.get('/:projectId/sprints/:sprintId', async (req, res, next) => {
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
});

// REMOVE SPRINT BY ID

router.delete('/:projectId/sprints/:sprintId', async (req, res, next) => {
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
});

// UPDATE SPRINT TITLE BY ID

router.patch('/:projectId/sprints/:sprintId', async (req, res, next) => {
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
});

module.exports = router;
