const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')

router.get('/', (req, res) => {
    res.redirect('/auth')
})
router.get('/start', (req, res) => {
    res.send("NodeJsMyAdmin - приветствует тебя!")
})

router.use('/auth', authRouter)

module.exports = router