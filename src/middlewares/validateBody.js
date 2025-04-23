// src/middlewares/validateBody.js
const Joi = require('joi');

/**
 * Middleware para validar req.body com um schema Joi.
 * @param {Joi.ObjectSchema} schema
 */
module.exports = schema => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });
    if (error) {
        // coleta todas as mensagens de erro
        const msgs = error.details.map(d => d.message);
        return res.status(400).json({ errors: msgs });
    }
    next();
};
