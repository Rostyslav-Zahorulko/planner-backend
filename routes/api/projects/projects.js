const express = require('express');
const router = express.Router();
const {
  getAll,
  getById,
  create,
  addUser,
  updateTitle,
  remove,
} = require('../../../controllers/projects');
const guard = require('../../../helpers/guard');
const {
  validateCreateProject,
  validateUpdateProject,
  validateAddUserIntoTeam,
} = require('./validation');

router.get('/', guard, getAll);

router.post('/', guard, validateCreateProject, create);

router.post('/:projectId', guard, validateAddUserIntoTeam, addUser);

router.get('/:projectId', guard, getById);

router.patch('/:projectId', guard, validateUpdateProject, updateTitle);

router.delete('/:projectId', guard, remove);

module.exports = router;
