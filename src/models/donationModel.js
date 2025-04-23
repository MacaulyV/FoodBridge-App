// src/models/donationModel.js
const oracledb         = require('oracledb');
const { getConnection } = require('../config/db');

async function createDonation({
                                  id, nome_alimento, validade, descricao,
                                  bairro, horario_preferido, termos, user_id,
                                  imagens_urls
                              }) {
    const conn = await getConnection();
    const sql  = `
        INSERT INTO donations
        (id, nome_alimento, validade, descricao,
         bairro_ou_distrito, horario_preferido,
         termos, user_id, imagens_urls)
        VALUES
            (:id, :nome_alimento, TO_DATE(:validade,'YYYY-MM-DD'), :descricao,
             :bairro, :horario_preferido,
             :termos, :user_id, :imagens_urls)
    `;
    await conn.execute(
        sql,
        {
            id,
            nome_alimento,
            validade,    // "YYYY-MM-DD"
            descricao,
            bairro,
            horario_preferido,
            termos,
            user_id,
            imagens_urls: (Array.isArray(imagens_urls) ? imagens_urls.join(',') : imagens_urls || '')
        },
        { autoCommit: true }
    );
    await conn.close();
}

async function getAllDonations() {
    const conn = await getConnection();
    const res  = await conn.execute(
        'SELECT * FROM donations',
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    return res.rows;
}

/**
 * GET todas as doações de um usuário
 * @param {string} user_id
 * @returns {Promise<Array>}
 */
async function getDonationsByUserId(user_id) {
    const conn = await getConnection();
    const res  = await conn.execute(
        `SELECT * FROM donations WHERE user_id = :u`,
        { u: user_id },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    return res.rows;
}

async function getDonationById(id) {
    const conn = await getConnection();
    const res  = await conn.execute(
        'SELECT * FROM donations WHERE id = :i',
        { i: id },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    return res.rows[0];
}

async function updateDonation(id, data) {
    // Se veio array, transforma em string; se veio vazio, seta vazio
    if (data.imagens_urls) {
        data.imagens_urls = Array.isArray(data.imagens_urls)
            ? data.imagens_urls.join(',')
            : data.imagens_urls;
    }

    const conn = await getConnection();

    // Monta SETs, mas converte validade com TO_DATE
    const sets = Object.keys(data).map(key => {
        if (key === 'validade') {
            return `validade = TO_DATE(:validade,'YYYY-MM-DD')`;
        }
        return `${key} = :${key}`;
    });

    const binds = { id, ...data };
    const sql = `UPDATE donations SET ${sets.join(', ')} WHERE id = :id`;

    await conn.execute(sql, binds, { autoCommit: true });
    await conn.close();
}

async function deleteDonation(id) {
    const conn = await getConnection();
    await conn.execute(
        'DELETE FROM donations WHERE id = :id',
        { id },
        { autoCommit: true }
    );
    await conn.close();
}

module.exports = {
    createDonation,
    getAllDonations,
    getDonationById,
    updateDonation,
    deleteDonation,
    getDonationsByUserId
};
