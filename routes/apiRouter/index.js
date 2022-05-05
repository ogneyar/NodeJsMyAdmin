const Router = require('express')

const dbRouter = require('./dbRouter')
const authRouter = require('./authRouter')
const tableRouter = require('./tableRouter')

const router = new Router()


router.use('/db', dbRouter)
router.use('/auth', authRouter)
router.use('/table', tableRouter)


module.exports = router