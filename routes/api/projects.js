const express = require('express');
const router = express.Router();
const {
  getAllPojects,
  getProjectById,
  createProject,
  updateProject,
  removeProject,
} = require('../../model/projects');
// const {
//   validateCreateContact,
//   validateUpdateContact,
// } = require('./validation');

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

router.post(
  '/',
  /* validateCreateContact */ async (req, res, next) => {
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
  }
);

router.patch(
  '/:projectId',
  /*validateUpdateContact*/ async (req, res, next) => {
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
  }
);

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

module.exports = router;
