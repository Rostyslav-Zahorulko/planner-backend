const Joi = require('joi');
const HttpCode = require('../../../helpers/constants');

const schemaSignupUser = Joi.object({
  name: Joi.string()
    .alphanum()
    .regex(/[A-Z]\w+/)
    .min(2)
    .max(30)
    .optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().min(8).required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().min(8).required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: HttpCode.BAD_REQUEST, message: err.message });
  }
};

module.exports.validateSignupUser = (req, _res, next) => {
  return validate(schemaSignupUser, req.body, next);
};

module.exports.validateLoginUser = (req, _res, next) => {
  return validate(schemaLoginUser, req.body, next);
};
