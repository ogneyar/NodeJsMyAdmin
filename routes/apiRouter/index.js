const Router = require('../../lib/Router')
const router = new Router()

const dbRouter = require('./dbRouter')
const authRouter = require('./authRouter')
const tableRouter = require('./tableRouter')


router.use('/db', dbRouter)
router.use('/auth', authRouter)
router.use('/table', tableRouter)


module.exports = router