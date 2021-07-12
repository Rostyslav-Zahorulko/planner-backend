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

router.post('/:projectId/sprints', guard, validateCreateSprint, create);

router.get('/:projectId/sprints/:sprintId', guard, getById);

router.delete('/:projectId/sprints/:sprintId', guard, removeById);

router.patch(
  '/:projectId/sprints/:sprintId',
  guard,
  validateUpdateSprint,
  patchTitleById,
);

module.exports = router;
