const express = require('express');
const router = express.Router();
const {
  create,
  getAll,
  getById,
  removeById,
  patchTitleById,
} = require('../../controllers/sprints');

// CREATE SPRINT
router.post('/:projectId', create);

// GET ALL SPRINTS AND PROJECT INFORMATION
router.get('/:projectId', getAll);

// GET SPRINT BY ID
router.get('/:projectId/:sprintId', getById);

// REMOVE SPRINT BY ID
router.delete('/:projectId/:sprintId', removeById);

// UPDATE SPRINT TITLE BY ID
router.patch('/:projectId/:sprintId', patchTitleById);

module.exports = router;
