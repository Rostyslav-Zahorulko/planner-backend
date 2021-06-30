const Project = require('./schemas/project');

// CREATING SPRINTS
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
  const project = await Project.find({ _id: projectId });
  const [{ sprints }] = project;
  const updatedSprints = await sprints.map(sprint => {
    if (sprint._id == sprintId) {
      const { _id, duration, startDate } = sprint;
      const updatedSprint = { _id, ...body, duration, startDate };
      console.log(updatedSprint);
      return updatedSprint;
    } else return sprint;
  });

  const result = await Project.findOneAndUpdate(
    {
      _id: projectId,
    },
    { sprints: [...updatedSprints] },
    { new: true },
  );
  return result;
};

module.exports = {
  createSprint,
  getSprintById,
  removeSprintById,
  updateSprintById,
};