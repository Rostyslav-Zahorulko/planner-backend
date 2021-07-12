const express = require('express');
const router = express.Router();
const {
  create,
  removeById,
  addWorkingHoursByDay,
} = require('../../../controllers/tasks');
const guard = require('../../../helpers/guard');
const { validateCreateTask, validateUpdateTask } = require('./validation');

router.post('/:projectId/sprints/:sprintId', guard, validateCreateTask, create);

router.delete('/:projectId/sprints/:sprintId/:taskId', guard, removeById);

router.patch(
  '/:projectId/sprints/:sprintId/:taskId',
  guard,
  validateUpdateTask,
  addWorkingHoursByDay,
);

module.exports = router;
