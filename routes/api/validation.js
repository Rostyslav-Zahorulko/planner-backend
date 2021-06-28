const Joi = require('joi');

const schemaCreateProject = Joi.object({
  title: Joi.string().alphanum().min(1).max(30).required(),
  description: Joi.string().min(1).max(50).required(),
});

const schemaUpdateProject = Joi.object({
  title: Joi.string().alphanum().min(1).max(30).required(),
  description: Joi.string().min(1).max(50).required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports.validateCreateProject = (req, _res, next) => {
  return validate(schemaCreateProject, req.body, next);
};

module.exports.validateUpdateProject = (req, _res, next) => {
  return validate(schemaUpdateProject, req.body, next);
};
