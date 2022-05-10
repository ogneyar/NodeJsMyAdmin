const path = require('path')

require('./lib/dotenv') // OR const dotenv =  require('./lib')
const server = require('./lib')
const router = require('./routes')
const { PORT } = require('./utils/consts')

const app = server()

app.static(path.join(__dirname, 'static'))

app.favicon(path.join(__dirname, 'static', 'favicon.ico'))

app.use('/', router)

app.listen(PORT, () => {
    console.log(`NJMA run on http://localhost:${PORT}`)
})