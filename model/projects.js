const Project = require('./schemas/project');

const getAllPojects = async () => {
  const results = await Project.find({});
  return results;
};

const getProjectById = async projectId => {
  const result = await Project.findOne({ _id: projectId });
  return result;
};

const createProject = async body => {
  const result = await Project.create(body);
  return result;
};

const updateProject = async (projectId, body) => {
  const result = await Project.findOneAndUpdate(
    {
      _id: projectId,
    },
    { ...body },
    { new: true },
  );
  return result;
};

const removeProject = async projectId => {
  const result = await Project.findByIdAndRemove({ _id: projectId });
  return result;
};

// CREATING SPRINTS
const createSprint = async (projectId, body) => {
  const currentSprints = await getProjectById(projectId);
  const result = await Project.findOneAndUpdate(
    {
      _id: projectId,
    },
    { sprints: [...currentSprints.sprints, body] },
    { new: true },
  );
  return result;
};

const getAllSprints = async () => {
  const results = await Project.find({});
  return results;
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
  getAllPojects,
  getProjectById,
  createProject,
  updateProject,
  removeProject,
  createSprint,
  getAllSprints,
  getSprintById,
  removeSprintById,
  updateSprintById,
};
