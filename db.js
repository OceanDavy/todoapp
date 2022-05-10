const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "qwe123",
    host: "localhost",
    port: 5432,
    database: "tododb"
});

module.exports = pool;