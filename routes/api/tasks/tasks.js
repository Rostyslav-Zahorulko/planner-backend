const express = require('express');
const router = express.Router();
const {
  create,
  removeById,
  addWorkingHoursByDay,
} = require('../../../controllers/tasks');
const guard = require('../../../helpers/guard');
const { validateCreateTask, validateUpdateTask } = require('./validation');

// CREATE TASK
router.post('/:projectId/sprints/:sprintId', guard, validateCreateTask, create);

// REMOVE TASK BY ID
router.delete('/:projectId/sprints/:sprintId/:taskId', guard, removeById);

// ADD AMOUNT OF WORKING HOURS BY DAY
router.patch(
  '/:projectId/sprints/:sprintId/:taskId',
  guard,
  validateUpdateTask,
  addWorkingHoursByDay,
);

module.exports = router;
