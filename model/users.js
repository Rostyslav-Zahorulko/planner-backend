const User = require('./schemas/user');

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByToken = async (token) => {
  return await User.findOne({ token });
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

module.exports = {
  findById,
  findByEmail,
  findByToken,
  create,
  updateToken,
};
