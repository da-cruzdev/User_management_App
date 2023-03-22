const Joi = require("joi");

const validation = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  tel: Joi.string()
    .pattern(/^\d{10}$/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .required(),
  details: Joi.string().max(500),
});

module.exports = validation;

// <!-- class="form-control <%= //typeof errors !== 'undefined' && errors.firstName ? 'is-invalid' : '' %><%= typeof //req.flash !== 'undefined' && req.flash('valid').length > 0 ? ' is-valid' : '' %>" -->
