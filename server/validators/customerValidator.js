const Joi = require("joi");

const validation = Joi.object({
  firstName: Joi.string().alphanum().min(2).max(30).required(),
  lastName: Joi.string().alphanum().min(2).max(30).required(),
  tel: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
  email: Joi.string().email().required(),
  details: Joi.string().required(),
});

module.exports = validation;
