const Project = require('./schemas/project');

// CREATING TASK
const createTask = async (projectId, sprintId, body) => {
  const currentProject = await Project.findById(projectId);
  const projectSprints = currentProject.sprints;
  const currentSprint = currentProject.sprints.id(sprintId);
  const tasks = currentProject.sprints.id(sprintId).tasks;
  tasks.push(body);
  currentSprint.tasks = tasks;
  // console.log(currentSprint);

  const result = await Project.findOneAndUpdate(
    {
      _id: projectId,
    },
    { sprints: [...projectSprints] },
    { new: true },
  );
  console.log(result);
  return result;
};

// const getSprintById = async (projectId, sprintId) => {
//   const project = await Project.find({ _id: projectId });
//   const [{ sprints }] = project;
//   const getsprint = sprints.find(sprint => sprint._id === sprintId);
//   return getsprint;
// };

// const removeSprintById = async (projectId, sprintId) => {
//   const project = await Project.find({ _id: projectId });
//   const [{ sprints }] = project;
//   const findsprint = await sprints.find(sprint => sprint._id === sprintId);
//   if (findsprint) {
//     const getsprint = sprints.filter(sprint => sprint._id !== sprintId);
//     const result = await Project.findOneAndUpdate(
//       {
//         _id: projectId,
//       },
//       { sprints: [...getsprint] },
//       { new: true },
//     );
//     return result;
//   }
// };

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
  // getSprintById,
  // removeSprintById,
  // updateSprintById,
};
