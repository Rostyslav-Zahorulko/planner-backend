const Project = require('./schemas/project');
const { nanoid } = require('nanoid');

// CREATING TASK
const createTask = async (projectId, sprintId, body) => {
  const currentProject = await Project.findById(projectId);
  const projectSprints = currentProject.sprints;
  const currentSprint = currentProject.sprints.id(sprintId);
  const { startDate, duration } = currentSprint; //
  const tasks = currentProject.sprints.id(sprintId).tasks;

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const daysArray = [];
  daysArray.length = duration;
  for (let i = 0; i < daysArray.length; i += 1) {
    daysArray[i] = {
      date: addDays(startDate, i),
      hoursSpent: 0,
    };
  }

  const newTask = Object.assign(
    {},
    { id: nanoid(), ...body, hoursPerDay: daysArray, startDate },
  );
  tasks.push(newTask);

  const result = await Project.findOneAndUpdate(
    {
      _id: projectId,
    },
    { sprints: [...projectSprints] },
    { new: true },
  );
  return result;
};

const removeTaskById = async (projectId, sprintId, taskId) => {
  const currentProject = await Project.findById(projectId);
  const projectSprints = currentProject.sprints;
  const currentSprint = currentProject.sprints.id(sprintId);
  const tasks = currentProject.sprints.id(sprintId).tasks;

  if (tasks) {
    const task = tasks.find(task => task._id == taskId);
    if (!task) {
      return;
    }
    const updatedTasks = tasks.filter(task => task._id != taskId);
    currentSprint.tasks = updatedTasks;
    const result = await Project.findOneAndUpdate(
      {
        _id: projectId,
      },
      { sprints: [...projectSprints] },
      { new: true },
    );
    return result;
  }
};

const patchTaskWorkingHoursByDay = async (
  projectId,
  sprintId,
  taskId,
  body,
) => {
  const currentProject = await Project.findById(projectId);
  const projectSprints = currentProject.sprints;
  const currentSprint = currentProject.sprints.id(sprintId);
  const tasks = currentProject.sprints.id(sprintId).tasks;
  const currentTask = currentProject.sprints.id(sprintId).tasks.id(taskId);

  function compareDates(d1, d2) {
    const date1 = new Date(d1);
    console.log(date1);
    const date2 = new Date(d2);
    console.log(date2);
    if (date1.getTime() == date2.getTime()) {
      return true;
    } else return false;
  }

  const { totalHours, hoursPerDay, title, plannedHours, _id } = currentTask;
  const updatedHoursPerDay = hoursPerDay.map(obj => {
    if (compareDates(obj.date, body.date)) {
      return body;
    } else return obj;
  });

  const updatedTask = Object.assign(
    {},
    { totalHours, hoursPerDay: updatedHoursPerDay, title, plannedHours, _id },
  );
  const updatedTasks = tasks.filter(task => task._id != taskId);
  updatedTasks.push(updatedTask);
  currentSprint.tasks = updatedTasks;
  await Project.findOneAndUpdate(
    {
      _id: projectId,
    },
    { sprints: [...projectSprints] },
    { new: true },
  );

  return updatedTasks;
};

module.exports = {
  createTask,
  removeTaskById,
  patchTaskWorkingHoursByDay,
};
