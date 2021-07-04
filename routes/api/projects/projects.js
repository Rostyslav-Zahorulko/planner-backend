const express = require('express');
const router = express.Router();
const {
  getAll,
  getById,
  create,
  // update,
  updateTitle,
  remove,
} = require('../../../controllers/projects');
const guard = require('../../../helpers/guard');
const {
  validateCreateProject,
  // validateUpdateProject,
} = require('./validation');

router.get('/', guard, getAll);

router.post('/', guard, validateCreateProject, create);

router.get('/:projectId', guard, getById);

// ОН НЕ НУЖЕН, НУЖЕН ТОЛЬКО АПДЕЙТ НАЗВАНИЯ
// router.patch('/:projectId', guard, validateUpdateProject, update);

router.patch('/:projectId', guard, updateTitle);

router.delete('/:projectId', guard, remove);

module.exports = router;
