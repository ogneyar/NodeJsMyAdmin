const Router = require('express')
const router = new Router()
const TableController = require('../../controllers/api/TableController')


router.post('/select', TableController.select)


module.exports = router