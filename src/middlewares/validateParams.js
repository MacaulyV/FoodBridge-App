// src/middlewares/validateParams.js
const Joi = require('joi');

/**
 * Middleware para validar req.params com um schema Joi.
 * @param {Joi.ObjectSchema} schema
 */
module.exports = schema => (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) {
        const msgs = error.details.map(d => d.message);
        return res.status(400).json({ errors: msgs });
    }
    next();
};
