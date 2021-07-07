const {
  getAllPojects,
  getProjectById,
  createProject,
  updateProject,
  updateProjectTitle,
  removeProject,
  addMemberToProject,
} = require('../model/projects');
const HttpCode = require('../helpers/constants');

const getAll = async (req, res, next) => {
  try {
    // const userId = req.user.id;
    const email = req.user.email;
    // console.log(userId);
    const { projects, total, limit, offset } = await getAllPojects(
      email,
      req.query,
    );
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        total,
        limit,
        offset,
        projects,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    // const userId = req.user.id;
    const email = req.user.email;
    console.log(email);
    const projectWithId = await getProjectById(email, req.params.projectId);
    if (projectWithId) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        project: projectWithId,
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    // const userId = req.user.id;
    const email = req.user.email;
    const project = await createProject({ ...req.body, team: email });
    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, project });
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.status = HttpCode.BAD_REQUEST;
    }
    next(err);
  }
};

// const update = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const projectWithId = await updateProject(
//       userId,
//       req.params.projectId,
//       req.body,
//     );
//     if (projectWithId) {
//       return res.status(HttpCode.OK).json({
//         status: 'success',
//         code: HttpCode.OK,
//         project: projectWithId,
//       });
//     }
//     return res.status(HttpCode.NOT_FOUND).json({
//       status: 'error',
//       code: HttpCode.NOT_FOUND,
//       message: 'Not found',
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const updateTitle = async (req, res, next) => {
  try {
    // const userId = req.user.id;
    const email = req.user.email;
    const project = await updateProjectTitle(
      email,
      req.params.projectId,
      req.body,
    );
    if (project) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        project,
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    // const userId = req.user.id;
    const email = req.user.email;
    const projectWithId = await removeProject(email, req.params.projectId);
    if (projectWithId) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        project: projectWithId,
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const projectId = req.params.projectId;

    // console.log(userEmail);
    // console.log(projectId);

    const data = await addMemberToProject(userEmail, projectId);
    // console.log(data);
    // Повертається масив id.Треба масив email.

    if (data) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data,
      });
    }

    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'User with such email is not existed',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  // update,
  updateTitle,
  remove,
  addUser,
};
