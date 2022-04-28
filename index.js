require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const router = require('./routes')
const path = require('path')
const PORT = process.env.PORT || 8800
const { exec } = require("child_process")

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
            exec(`start http://localhost:${PORT}`, () => {})
        })
    }catch (e) {
        console.log(e)
    }
}

start()
