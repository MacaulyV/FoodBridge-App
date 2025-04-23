// src/controllers/userController.js
const bcrypt        = require('bcrypt');
const generateId    = require('../utils/idGenerator');
const userModel     = require('../models/userModel');
const donationModel = require('../models/donationModel');

/**
 * Helper para formatar a string CLOB de imagens em URLs completas
 */
function formatImageUrls(req, raw) {
    if (!raw) return [];
    const files = raw.split(',').filter(Boolean);
    const base  = `${req.protocol}://${req.get('host')}/uploads`;
    return files.map(f => `${base}/${f}`);
}

/**
 * POST /users
 * Cria um novo usuário
 */
async function register(req, res, next) {
    try {
        const { nome, email, senha, tipo, bairro_ou_distrito, cidade } = req.body;
        const id = generateId();
        const senha_hash = await bcrypt.hash(senha, 10);

        await userModel.createUser({
            id,
            nome,
            email,
            senha_hash,
            tipo,
            bairro: bairro_ou_distrito,
            cidade
        });

        res.status(201).json({ id, nome, email, tipo, bairro_ou_distrito, cidade });
    } catch (err) {
        next(err);
    }
}

/**
 * POST /users/login
 * Autentica um usuário
 */
async function login(req, res, next) {
    try {
        const { email, senha } = req.body;
        const user = await userModel.findUserByEmail(email);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        const match = await bcrypt.compare(senha, user.SENHA_HASH);
        if (!match) return res.status(401).json({ error: 'Senha incorreta' });

        res.json({
            message: 'Login bem‑sucedido',
            user: {
                id: user.ID,
                nome: user.NOME,
                email: user.EMAIL,
                tipo: user.TIPO,
                bairro_ou_distrito: user.BAIRRO_OU_DISTRITO,
                cidade: user.CIDADE
            }
        });
    } catch (err) {
        next(err);
    }
}

/**
 * GET /users/:id
 * Retorna dados básicos do usuário
 */
async function getUserById(req, res, next) {
    try {
        const user = await userModel.findUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        res.json({
            id: user.ID,
            nome: user.NOME,
            email: user.EMAIL,
            tipo: user.TIPO,
            bairro_ou_distrito: user.BAIRRO_OU_DISTRITO,
            cidade: user.CIDADE
        });
    } catch (err) {
        next(err);
    }
}

/**
 * GET /users/:id/completo
 * Retorna dados do usuário + lista de todas as suas doações
 */
async function getUserComplete(req, res, next) {
    try {
        const id = req.params.id;
        const user = await userModel.findUserById(id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        const doacoesRaw = await donationModel.getDonationsByUserId(id);
        const doacoes = doacoesRaw.map(d => ({
            id: d.ID,
            nome_alimento: d.NOME_ALIMENTO,
            validade: d.VALIDADE,
            descricao: d.DESCRICAO,
            bairro_ou_distrito: d.BAIRRO_OU_DISTRITO,
            horario_preferido: d.HORARIO_PREFERIDO,
            termos: d.TERMOS,
            imagens_urls: formatImageUrls(req, d.IMAGENS_URLS)
        }));

        res.json({
            usuario: {
                id: user.ID,
                nome: user.NOME,
                email: user.EMAIL,
                tipo: user.TIPO,
                bairro_ou_distrito: user.BAIRRO_OU_DISTRITO,
                cidade: user.CIDADE
            },
            doacoes
        });
    } catch (err) {
        next(err);
    }
}

/**
 * PUT /users/:id
 * Atualiza dados do usuário (e opcionalmente senha)
 */
async function updateUser(req, res, next) {
    try {
        const { senha, nome, email, tipo, bairro_ou_distrito, cidade } = req.body;
        const updates = { nome, email, tipo, bairro_ou_distrito, cidade };

        if (senha) {
            updates.senha_hash = await bcrypt.hash(senha, 10);
        }

        await userModel.updateUser(req.params.id, updates);
        res.json({ message: 'Usuário atualizado' });
    } catch (err) {
        next(err);
    }
}

/**
 * DELETE /users/:id
 * Exclui um usuário
 */
async function deleteUser(req, res, next) {
    try {
        await userModel.deleteUser(req.params.id);
        res.json({ message: 'Usuário deletado' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    login,
    getUserById,
    getUserComplete,
    updateUser,
    deleteUser
};
