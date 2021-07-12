const Project = require('./schemas/project');

const createSprint = async (projectId, body) => {
  const currentSprints = await Project.findOne({ _id: projectId });
  const result = await Project.findOneAndUpdate(
    {
      _id: projectId,
    },
    { sprints: [...currentSprints.sprints, body] },
    { new: true },
  );

  return result;
};

const getSprintById = async (projectId, sprintId) => {
  const project = await Project.find({ _id: projectId });
  const [{ sprints }] = project;
  const getsprint = sprints.find(sprint => sprint._id == sprintId);

  return getsprint;
};

const removeSprintById = async (projectId, sprintId) => {
  const project = await Project.find({ _id: projectId });
  const [{ sprints }] = project;
  const findsprint = await sprints.find(sprint => sprint._id == sprintId);

  if (findsprint) {
    const getsprint = sprints.filter(sprint => sprint._id != sprintId);
    const result = await Project.findOneAndUpdate(
      {
        _id: projectId,
      },
      { sprints: [...getsprint] },
      { new: true },
    );

    return result;
  }
};

const updateSprintById = async (projectId, sprintId, body) => {
  const project = await Project.findById(projectId);
  const projectSprints = project.sprints;
  const currentSprint = project.sprints.id(sprintId);
  currentSprint.title = body.title;
  await Project.findOneAndUpdate(
    {
      _id: projectId,
    },
    { sprints: [...projectSprints] },
    { new: true },
  );

  return currentSprint;
};

module.exports = {
  createSprint,
  getSprintById,
  removeSprintById,
  updateSprintById,
};
