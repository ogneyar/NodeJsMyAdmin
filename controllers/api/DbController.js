const path = require('path')

const showDatabases = require('../../service/api/db/showDatabases')
const showTables = require('../../service/api/db/showTables')


class DbController {
    async getAll(req, res, next) {
        let { user, pass, host } = req.body // JSON.parse(req.body)
        let response = await showDatabases(user, pass, host)

        return next(res.send(response))
    }

    async select(req, res, next) {
        // name = database name
        let { name, user, pass, host } = req.body // JSON.parse(req.body)
        let response = await showTables(name, user, pass, host)

        return next(res.send(response))
    }
}

module.exports = new DbController()