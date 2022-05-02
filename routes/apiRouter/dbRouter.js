const Router = require('express')
const router = new Router()
const DbController = require('../../controllers/api/DbController')


router.post('/', DbController.getAll)
router.post('/select', DbController.select)


module.exports = router