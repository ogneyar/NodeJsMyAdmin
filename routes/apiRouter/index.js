const Router = require('express')
const dbRouter = require('./dbRouter')

const router = new Router()


router.use('/db', dbRouter)


module.exports = router