require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const router = require('./routes')
const path = require('path')
const { PORT } = require('./utils/consts')

const app = express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync() 
        app.listen(PORT, () => {
            console.log(`Server run: http://localhost:${PORT}`)
        })
    }catch (e) {
        console.log(e)
    }
}

start()
