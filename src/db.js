const mysql = require('mysql2/promise');
const conf = require('./config.js');


async function connectDB() {
  const connection = await mysql.createConnection({
    host: conf.host,
    user: conf.userdtb,
    password: conf.passdb,
    database: conf.db,
    ssl: {
      rejectUnauthorized: false
    }
  })
  return connection;
}

module.exports = connectDB;