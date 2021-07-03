const Joi = require('joi');
const HttpCode = require('../../../helpers/constants');

const schemaCreateSprint = Joi.object({
  title: Joi.string().min(1).max(60).required(),
  duration: Joi.number().integer().required(),
  startDate: Joi.date().required(),
});

const schemaUpdateSprint = Joi.object({
  title: Joi.string().min(1).max(30).required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: HttpCode.BAD_REQUEST, message: err.message });
  }
};

module.exports.validateCreateSprint = (req, _res, next) => {
  return validate(schemaCreateSprint, req.body, next);
};

module.exports.validateUpdateSprint = (req, _res, next) => {
  return validate(schemaUpdateSprint, req.body, next);
};
