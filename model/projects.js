const Contact = require('./schema/project');

const getAllPojects = async () => {
  const results = await Contact.find({});
  return results;
};

const getProjectById = async (projectId) => {
  const result = await Contact.findOne({ _id: projectId });
  return result;
};

const addProject = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateProject = async (projectId, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: projectId,
    },
    { ...body },
    { new: true }
  );
  return result;
};

const removeProject = async (projectId) => {
  const result = await Contact.findByIdAndRemove({ _id: projectId });
  return result;
};

module.exports = {
  getAllPojects,
  getProjectById,
  addProject,
  updateProject,
  removeProject,
};
