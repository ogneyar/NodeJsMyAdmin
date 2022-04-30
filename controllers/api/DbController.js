const path = require('path')

const db = require('../../db')
const showDatabases = require('../../service/api/db/showDatabases')
const showTables = require('../../service/api/db/showTables')


class DbController {
    async getAll(req, res, next) {
        return res.send(await showDatabases())
    }

    async select(req, res, next) {
        let { name } = req.query
        return res.send(await showTables(name))
    }
}

module.exports = new DbController()