const Router = require('express')
const router = new Router()
const MainController = require('../controllers/MainController')


router.get('/', MainController.start)

module.exports = router