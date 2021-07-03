const Project = require('./schemas/project');

// CREATING TASK
const createTask = async (projectId, sprintId, body) => {
  const currentProject = await Project.findById(projectId);
  const projectSprints = currentProject.sprints;
  const currentSprint = currentProject.sprints.id(sprintId);
  const tasks = currentProject.sprints.id(sprintId).tasks;
  tasks.push(body);
  currentSprint.tasks = tasks;

  const result = await Project.findOneAndUpdate(
    {
      _id: projectId,
    },
    { sprints: [...projectSprints] },
    { new: true },
  );
  return result;
};

// const getSprintById = async (projectId, sprintId) => {
//   const project = await Project.find({ _id: projectId });
//   const [{ sprints }] = project;
//   const getsprint = sprints.find(sprint => sprint._id === sprintId);
//   return getsprint;
// };

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

// const updateSprintById = async (projectId, sprintId, body) => {
//   const project = await Project.find({ _id: projectId });
//   const [{ sprints }] = project;
//   const updatedSprints = await sprints.map(sprint => {
//     if (sprint._id === sprintId) {
//       const { _id, duration, startDate } = sprint;
//       const updatedSprint = { _id, ...body, duration, startDate };
//       console.log(updatedSprint);
//       return updatedSprint;
//     } else return sprint;
//   });

//   const result = await Project.findOneAndUpdate(
//     {
//       _id: projectId,
//     },
//     { sprints: [...updatedSprints] },
//     { new: true },
//   );
//   return result;
// };

module.exports = {
  createTask,
  removeTaskById,
  // getSprintById,
  // updateSprintById,
};
