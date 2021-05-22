const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "67camar0",
  host: "localhost",
  database: "todolist",
  port: 5432,
});

module.exports = pool;
