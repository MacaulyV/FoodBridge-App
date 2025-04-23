// src/models/userModel.js
const oracledb       = require('oracledb');
const { getConnection } = require('../config/db');

async function createUser({ id, nome, email, senha_hash, tipo, bairro, cidade }) {
    const conn = await getConnection();
    const sql  = `
        INSERT INTO users
            (id, nome, email, senha_hash, tipo, bairro_ou_distrito, cidade)
        VALUES
            (:id, :nome, :email, :senha_hash, :tipo, :bairro, :cidade)
    `;
    await conn.execute(
        sql,
        { id, nome, email, senha_hash, tipo, bairro, cidade },
        { autoCommit: true }
    );
    await conn.close();
}

async function findUserByEmail(email) {
    const conn = await getConnection();
    const res  = await conn.execute(
        `SELECT * FROM users WHERE email = :e`,
        { e: email },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    return res.rows[0];  // agora é um objeto com SENHA_HASH definido
}

async function findUserById(id) {
    const conn = await getConnection();
    const res  = await conn.execute(
        `SELECT * FROM users WHERE id = :i`,
        { i: id },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    return res.rows[0];
}

async function updateUser(id, data) {
    const conn = await getConnection();
    const sets = Object.keys(data).map(k => `${k} = :${k}`);
    const binds = { id, ...data };
    const sql = `UPDATE users SET ${sets.join(', ')} WHERE id = :id`;
    await conn.execute(sql, binds, { autoCommit: true });
    await conn.close();
}

async function deleteUser(id) {
    const conn = await getConnection();
    await conn.execute(
        `DELETE FROM users WHERE id = :id`,
        { id },
        { autoCommit: true }
    );
    await conn.close();
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    deleteUser
};
