const mysql = require('mysql2/promise')
require('dotenv').config();

const db = mysql.createPool({
    host:process.env.HOST,
    port:process.env.PORTDB,
    user:process.env.USER,
    password:process.env.PASS,
    database:process.env.DB
})

const status = db.getConnection();
console.log(status);

module.exports = db