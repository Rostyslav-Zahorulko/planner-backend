const express = require('express');
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../../../controllers/projects');
const guard = require('../../../helpers/guard');
const {
  validateCreateProject,
  validateUpdateProject,
} = require('./validation');

router.get('/', guard, getAll);

router.get('/:projectId', guard, getById);

router.post('/', guard, validateCreateProject, create);

router.patch('/:projectId', guard, validateUpdateProject, update);

router.delete('/:projectId', guard, remove);

module.exports = router;
