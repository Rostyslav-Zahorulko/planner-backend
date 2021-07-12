const Project = require('./schemas/project');
const { nanoid } = require('nanoid');

const createTask = async (projectId, sprintId, body) => {
  const currentProject = await Project.findById(projectId);
  const projectSprints = currentProject.sprints;
  const currentSprint = currentProject.sprints.id(sprintId);
  const { startDate, duration } = currentSprint; //
  const tasks = currentProject.sprints.id(sprintId).tasks;

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days).toString();

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
  const tasks = currentProject.sprints.id(sprintId).tasks;
  const currentTask = currentProject.sprints.id(sprintId).tasks.id(taskId);

  function compareDates(d1, d2) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    if (date1.getTime() == date2.getTime()) {
      return true;
    } else return false;
  }

  const { hoursPerDay, title, _id } = currentTask;
  let { plannedHours } = currentTask;
  const updatedHoursPerDay = hoursPerDay.map(obj => {
    if (compareDates(obj.date, body.date)) {
      const correctedDate = new Date(body.date);
      const updatedBody = Object.assign(
        {},
        {
          ...body,
          date: correctedDate,
        },
      );

      return updatedBody;
    } else return obj;
  });

  let updatedTotalHours = 0;

  for (let i = 0; i < updatedHoursPerDay.length; i += 1) {
    updatedTotalHours += updatedHoursPerDay[i].hoursSpent;
  }

  if (plannedHours <= updatedTotalHours) {
    plannedHours = updatedTotalHours;
  }

  const updatedTask = Object.assign(
    {},
    {
      totalHours: updatedTotalHours,
      hoursPerDay: updatedHoursPerDay,
      title,
      plannedHours,
      _id,
    },
  );

  const currentTaskIndex = tasks.findIndex(task => task._id == taskId);
  tasks.splice(currentTaskIndex, 1, updatedTask);
  await Project.findOneAndUpdate(
    {
      _id: projectId,
    },
    { sprints: [...projectSprints] },
    { new: true },
  );

  return tasks;
};

module.exports = {
  createTask,
  removeTaskById,
  patchTaskWorkingHoursByDay,
};
