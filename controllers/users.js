const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const {
  findByEmail,
  findByToken,
  create,
  updateToken,
} = require('../model/users');
const HttpCode = require('../helpers/constants');

const signup = async (req, res, next) => {
  try {
    const user = await findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email in use',
      });
    }
    const newUser = await create(req.body);
    const { id, email } = newUser;

    const token = jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '2h' });
    await updateToken(id, token);

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      user: {
        id,
        email,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    const isValidPassword = await user?.validPassword(password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });
    await updateToken(user.id, token);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, _next) => {
  await updateToken(req.user.id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const currentUser = async (req, res, next) => {
  try {
    const userToken = req.user.token;
    const { email } = req.user;
    const curUser = await findByToken(userToken);
    if (curUser) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          email,
        },
      });
    }
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  login,
  logout,
  currentUser,
};
