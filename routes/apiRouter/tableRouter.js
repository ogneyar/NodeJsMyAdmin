const Router = require('../../lib/Router')
const router = new Router()
const TableController = require('../../controllers/api/TableController')


router.get('/select', TableController.select)


module.exports = router