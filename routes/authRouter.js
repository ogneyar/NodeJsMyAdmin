const Router = require('express')
const router = new Router()
const AuthController = require('../controllers/AuthController')

// router.post('/login', authController.login)
router.get('/', AuthController.auth)

module.exports = router