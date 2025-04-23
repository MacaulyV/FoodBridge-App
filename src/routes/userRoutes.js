// src/routes/userRoutes.js
const express        = require('express');
const validateBody   = require('../middlewares/validateBody');
const validateParams = require('../middlewares/validateParams');
const {
    userCreateSchema,
    userLoginSchema,
    idParamSchema
} = require('../validation/schemas');

const {
    register,
    login,
    getUserById,
    getUserComplete,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

// POST /users — criar novo usuário
router.post(
    '/',
    validateBody(userCreateSchema),
    register
);

// POST /users/login — autenticar usuário
router.post(
    '/login',
    validateBody(userLoginSchema),
    login
);

// GET /users/:id — obter dados básicos do usuário
router.get(
    '/:id',
    validateParams(idParamSchema),
    getUserById
);

// GET /users/:id/completo — ficha completa: dados + doações
router.get(
    '/:id/completo',
    validateParams(idParamSchema),
    getUserComplete
);

// PUT /users/:id — atualizar usuário (inclui opção de trocar senha)
router.put(
    '/:id',
    validateParams(idParamSchema),
    validateBody(userCreateSchema),
    updateUser
);

// DELETE /users/:id — excluir usuário
router.delete(
    '/:id',
    validateParams(idParamSchema),
    deleteUser
);

module.exports = router;
