require('./lib/dotenv')
const mysql = require("mysql2")

module.exports = (user, password = "", host = "localhost") => {
    if ( ! user ) return null

    return mysql.createConnection({ host, user, password })
}