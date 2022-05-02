const Router = require('express')
const router = new Router()
const AuthController = require('../../controllers/api/AuthController')


router.post('/', AuthController.auth)
router.post('/log_in', AuthController.logIn)


module.exports = router