const path = require('path')

const showRows = require('../../service/api/table/showRows')


class TableController {
    async select(req, res) {
        // name = table name
        let { name, db_name, user, pass, host } = req.params // JSON.parse(req.body)
        let response = await showRows(name, db_name, user, pass, host)

        res.send(response)
        return true
    }
}

module.exports = new TableController()