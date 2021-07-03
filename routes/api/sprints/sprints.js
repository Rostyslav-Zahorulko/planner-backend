const express = require('express');
const router = express.Router();
const {
  create,
  getById,
  removeById,
  patchTitleById,
} = require('../../../controllers/sprints');
const guard = require('../../../helpers/guard');
const { validateCreateSprint, validateUpdateSprint } = require('./validation');

// CREATE SPRINT
router.post('/:projectId', guard, validateCreateSprint, create);

// GET SPRINT BY ID
router.get('/:projectId/:sprintId', guard, getById);

// REMOVE SPRINT BY ID
router.delete('/:projectId/:sprintId', guard, removeById);

// UPDATE SPRINT TITLE BY ID
router.patch(
  '/:projectId/:sprintId',
  guard,
  validateUpdateSprint,
  patchTitleById,
);

module.exports = router;
