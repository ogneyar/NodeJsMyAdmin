const path = require('path')

const showRows = require('../../service/api/table/showRows')


class TableController {
    async select(req, res, next) {
        // name = table name
        let { name, db_name, user, pass, host } = req.body // JSON.parse(req.body)
        let response = await showRows(name, db_name, user, pass, host)

        return next(res.send(response))
    }
}

module.exports = new TableController()