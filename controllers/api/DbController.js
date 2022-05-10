
const showDatabases = require('../../service/api/db/showDatabases')
const showTables = require('../../service/api/db/showTables')


class DbController {
    async getAll(req, res) {
        let { user, pass, host } = req.params // JSON.parse(req.body)
        let response = await showDatabases(user, pass, host)

        res.send(response)
        return true
    }

    async select(req, res) {
        // name = database name
        let { name, user, pass, host } = req.params // JSON.parse(req.body)
        let response = await showTables(name, user, pass, host)

        res.send(response)
        return true
    }
}

module.exports = new DbController()