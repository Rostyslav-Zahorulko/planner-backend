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

module.exports = {
  getAllPojects,
  getProjectById,
  createProject,
  updateProject,
  removeProject,
};
