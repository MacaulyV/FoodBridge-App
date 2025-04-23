// src/validation/schemas.js
const Joi = require('joi');

///////////////////////
// Parâmetros de rota
///////////////////////
const idParamSchema = Joi.object({
    id: Joi.string()
        .pattern(/^\d{6}$/)
        .message('O id deve ter exatamente 6 dígitos numéricos')
        .required()
});

///////////////////////
// Usuário
///////////////////////
const userCreateSchema = Joi.object({
    nome: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).max(50).required(),
    tipo: Joi.string()
        .valid('Pessoa Física','ONG','Pessoa Jurídica')
        .required(),
    bairro_ou_distrito: Joi.string().max(100).required(),
    cidade: Joi.string().max(100).required()
});

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().min(1).required()
});

///////////////////////
// Doação
///////////////////////
const donationCreateSchema = Joi.object({
    nome_alimento:      Joi.string().max(100).required(),
    validade:           Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .message('validade deve estar no formato YYYY-MM-DD')
        .required(),
    descricao:          Joi.string().max(1000).allow('', null),
    bairro_ou_distrito: Joi.string().max(100).required(),
    horario_preferido:  Joi.string().max(50).allow('', null),
    termos:             Joi.string().valid('Sim').required(),
    user_id:            Joi.string().length(6).required()
});

// Atualização de doação sem user_id
const donationUpdateSchema = Joi.object({
    nome_alimento:      Joi.string().max(100).required(),
    validade:           Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .message('validade deve estar no formato YYYY-MM-DD')
        .required(),
    descricao:          Joi.string().max(1000).allow('', null),
    bairro_ou_distrito: Joi.string().max(100).required(),
    horario_preferido:  Joi.string().max(50).allow('', null),
    termos:             Joi.string().valid('Sim').required(),
    imagens_urls:       Joi.array()
        .items(
            Joi.string()
                .max(255)
                .message('Cada nome de arquivo deve ter até 255 caracteres')
        )
        .optional(),
    imagens_manter:     Joi.string().optional()
});

const userIdParamSchema = Joi.object({
    userId: Joi.string()
        .pattern(/^\d{6}$/)
        .message('O id do usuário deve ter exatamente 6 dígitos numéricos')
        .required()
});

module.exports = {
    idParamSchema,
    userCreateSchema,
    userLoginSchema,
    donationCreateSchema,
    donationUpdateSchema,
    userIdParamSchema
};
