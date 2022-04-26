const Router = require('express')
const router = new Router()
const AuthController = require('../controllers/AuthController')


router.get('/', AuthController.auth)

module.exports = router