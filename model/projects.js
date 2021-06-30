const Project = require('./schemas/project');

const getAllPojects = async (userId, query) => {
  const { limit = 5, offset = 0, sortBy, sortByDesc, filter } = query;
  const optionsSearch = { team: userId };
  const results = await Project.paginate(optionsSearch, {
    limit,
    offset,
    select: filter ? filter.split('|').join(' ') : '',
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
  });
  const { docs: projects, totalDocs: total } = results;
  return { projects, total, limit, offset };
};

const getProjectById = async (userId, projectId) => {
  const result = await Project.findOne({
    _id: projectId,
    team: userId,
  }).populate({ path: 'team', select: 'email -_id' });
  return result;
};

const createProject = async (body) => {
  const result = await Project.create(body);
  return result;
};

const updateProject = async (userId, projectId, body) => {
  const result = await Project.findOneAndUpdate(
    {
      _id: projectId,
      team: userId,
    },
    { ...body },
    { new: true }
  );
  return result;
};

const removeProject = async (userId, projectId) => {
  const result = await Project.findByIdAndRemove({
    _id: projectId,
    team: userId,
  });
  return result;
};

module.exports = {
  getAllPojects,
  getProjectById,
  createProject,
  updateProject,
  removeProject,
};
