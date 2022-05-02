require('dotenv').config()
const express = require('express')
const path = require('path')
const router = require('./routes')
const { PORT } = require('./utils/consts')

const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/', router)

app.listen(PORT, () => {
    console.log(`NJMA run on http://localhost:${PORT}`)
})