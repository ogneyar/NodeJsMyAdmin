const Router = require('../../lib/Router')
const router = new Router()
const AuthController = require('../../controllers/api/AuthController')


router.get('/', AuthController.auth)
router.get('/log_in', AuthController.logIn)


module.exports = router