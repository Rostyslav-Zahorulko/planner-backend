const express = require('express');
const router = express.Router();
const {
  create,
  // getById,
  // removeById,
  // addWorkingHoursByDay,
} = require('../../controllers/tasks');

// CREATE TASK
router.post('/:projectId/:sprintId', create);

// GET TASK BY ID
// router.get('/:projectId/:sprintId/:taskId', getById);

// REMOVE TASK BY ID
// router.delete('/:projectId/:sprintId/:taskId', removeById);

// ADD AMOUNT OF WORKING HOURS BY DAY
// router.patch('/:projectId/:sprintId/:taskId/:dayNumber', addWorkingHoursByDay);

module.exports = router;
