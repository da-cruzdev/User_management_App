const Joi = require("joi");

const validation = Joi.object({
  firstName: Joi.string().min(2).max(30).trim().required(),
  lastName: Joi.string().min(2).max(30).trim().required(),
  tel: Joi.string()
    .pattern(/^\d{10}$/)
    .trim()
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .trim()
    .required(),
  details: Joi.string().max(500).trim(),
});

module.exports = validation;

// <!-- class="form-control <%= //typeof errors !== 'undefined' && errors.firstName ? 'is-invalid' : '' %><%= typeof //req.flash !== 'undefined' && req.flash('valid').length > 0 ? ' is-valid' : '' %>" -->
