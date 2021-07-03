const express = require('express');
const router = express.Router();
const {
  create,
  // getById,
  removeById,
  // addWorkingHoursByDay,
} = require('../../../controllers/tasks');
const guard = require('../../../helpers/guard');
const { validateCreateTask } = require('./validation');

// CREATE TASK
router.post('/:projectId/:sprintId', guard, validateCreateTask, create);

// GET TASK BY ID
// router.get('/:projectId/:sprintId/:taskId', getById);

// REMOVE TASK BY ID
router.delete('/:projectId/:sprintId/:taskId', guard, removeById);

// ADD AMOUNT OF WORKING HOURS BY DAY
// router.patch('/:projectId/:sprintId/:taskId/:dayNumber', addWorkingHoursByDay);

module.exports = router;
