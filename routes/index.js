const path = require('path')

const Router = require('../lib/Router')
const mainRouter = require('./mainRouter')
const apiRouter = require('./apiRouter')

const router = new Router()

router.use('/main', mainRouter)
router.use('/api', apiRouter)

router.get('/', (req, res) => {
    // return res.redirect('/auth')
    return res.sendFile(path.join(__dirname, '..', 'static', 'pages', 'auth.html'))
    return res.sendFile(path.join('pages', 'auth.html')) // можно и так, если указана статическая папка
})


module.exports = router