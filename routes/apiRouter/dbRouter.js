const Router = require('../../lib/Router')
const router = new Router()
const DbController = require('../../controllers/api/DbController')


router.get('/', DbController.getAll)
router.get('/select', DbController.select)


module.exports = router