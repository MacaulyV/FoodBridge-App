require('dotenv').config();
const oracledb = require('oracledb');

// Faz o driver devolver CLOBs como string UTF-8
oracledb.fetchAsString = [ oracledb.CLOB ];

async function getConnection() {
    return await oracledb.getConnection({
        user:     process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        connectionString: process.env.ORACLE_CONNECTION_STRING

    });
}

module.exports = { getConnection };
