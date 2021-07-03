const Joi = require('joi');
const HttpCode = require('../../../helpers/constants');

const schemaCreateTask = Joi.object({
  title: Joi.string().min(1).max(60).required(),
  plannedHours: Joi.number().integer().required(),
  totalHours: Joi.number().integer(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: HttpCode.BAD_REQUEST, message: err.message });
  }
};

module.exports.validateCreateTask = (req, _res, next) => {
  return validate(schemaCreateTask, req.body, next);
};
