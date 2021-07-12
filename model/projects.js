const Project = require('./schemas/project');
const User = require('./schemas/user');

const getAllPojects = async (email, query) => {
  const { offset = 0, sortBy, sortByDesc, filter } = query;
  const optionsSearch = { team: email };
  const results = await Project.paginate(optionsSearch, {
    offset,
    select: filter ? filter.split('|').join(' ') : '',
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
  });
  const { docs: projects, totalDocs: total } = results;

  return { projects, total, offset };
};

const getProjectById = async (email, projectId) => {
  const result = await Project.findOne({
    _id: projectId,
    team: email,
  });

  return result;
};

const createProject = async body => {
  const result = await Project.create(body);

  return result;
};

const updateProjectTitle = async (email, projectId, body) => {
  const project = await Project.findById(projectId);
  project.title = body.title;
  const result = await Project.findOneAndUpdate(
    {
      _id: projectId,
      team: email,
    },
    { ...project },
    { new: true },
  );

  return result;
};

const removeProject = async (email, projectId) => {
  const result = await Project.findByIdAndRemove({
    _id: projectId,
    team: email,
  });

  return result;
};

const addMemberToProject = async (userEmail, projectId) => {
  const user = await User.find({ email: userEmail });

  if (Object.keys(user).length == 0) {
    throw Error('User with such email is not registered yet!');
  }

  const [{ email }] = user;
  const currentProject = await Project.findById(projectId);

  if (currentProject.team.includes(userEmail)) {
    throw Error('User with such email already exists in team');
  }

  await Project.updateOne({ _id: projectId }, { $push: { team: email } });
  const updatedProject = await Project.findById(projectId);
  const { team } = updatedProject;

  return team;
};

module.exports = {
  getAllPojects,
  getProjectById,
  createProject,
  updateProjectTitle,
  removeProject,
  addMemberToProject,
};
