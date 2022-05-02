const Router = require('express')

const dbRouter = require('./dbRouter')
const authRoutter = require('./authRoutter')

const router = new Router()


router.use('/db', dbRouter)
router.use('/auth', authRoutter)


module.exports = router