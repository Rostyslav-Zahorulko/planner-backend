const express = require('express');
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../../../controllers/projects');
const {
  validateCreateProject,
  validateUpdateProject,
} = require('./validation');

router.get('/', getAll);

router.get('/:projectId', getById);

router.post('/', validateCreateProject, create);

router.patch('/:projectId', validateUpdateProject, update);

router.delete('/:projectId', remove);

module.exports = router;
