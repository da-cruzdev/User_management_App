const Joi = require("joi");

const validation = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  tel: Joi.string()
    .pattern(/^\d{10}$/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  details: Joi.string().max(500),
});

module.exports = validation;
