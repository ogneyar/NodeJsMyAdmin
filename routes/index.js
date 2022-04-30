const Router = require('express')
const path = require('path')

const authRouter = require('./authRouter')
const mainRouter = require('./mainRouter')
const apiRouter = require('./apiRouter')

const router = new Router()


router.get('/', (req, res) => res.redirect('/auth'))

router.use('/auth', authRouter)
router.use('/main', mainRouter)
router.use('/api', apiRouter)


module.exports = router