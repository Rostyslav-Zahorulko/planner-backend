const Joi = require('joi');
const HttpCode = require('../../../helpers/constants');

const schemaCreateProject = Joi.object({
  title: Joi.string().min(1).max(30).required(),
  description: Joi.string().min(1).max(50).required(),
});

const schemaUpdateProject = Joi.object({
  title: Joi.string().min(1).max(30).required(),
  description: Joi.string().min(1).max(50).required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: HttpCode.BAD_REQUEST, message: err.message });
  }
};

module.exports.validateCreateProject = (req, _res, next) => {
  return validate(schemaCreateProject, req.body, next);
};

module.exports.validateUpdateProject = (req, _res, next) => {
  return validate(schemaUpdateProject, req.body, next);
};
