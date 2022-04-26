const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME || "test",
    process.env.DB_USER || "root",
    process.env.DB_PASS || "",
    {
        dialect: process.env.DB || "mysql",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306
    }
)