require('dotenv').config();
const puerto = process.env.PORT || 9002
const host = process.env.DB_HOST
const userdtb = process.env.DB_USER
const passdb = process.env.DB_PASSWORD
const db = process.env.DB_DATABASE
const dbport = process.env.DB_PORT

module.exports = {puerto, host, userdtb, passdb, db, dbport};