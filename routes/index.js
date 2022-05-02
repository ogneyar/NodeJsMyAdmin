const Router = require('express')
const path = require('path')

const mainRouter = require('./mainRouter')
const apiRouter = require('./apiRouter')


const router = new Router()

router.use('/main', mainRouter)
router.use('/api', apiRouter)

router.get('/', (req, res, next) => {
    // return res.redirect('/auth')
    return res.sendFile(path.join(__dirname,'..','static', 'pages', 'auth.html'))
})


module.exports = router