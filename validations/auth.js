const Joi = require("joi");

exports.validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(req);
};
