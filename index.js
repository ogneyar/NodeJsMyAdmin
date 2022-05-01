require('dotenv').config()
const express = require('express')
// const sequelize = require('./db')
// const db = require('./db')
const router = require('./routes')
const path = require('path')
const { PORT } = require('./utils/consts')

const app = express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/', router)

const start = async () => {
    try {
        // await sequelize.authenticate()
        // await sequelize.sync() 

        // подключение к базе данных
        // db.connect(err => {
        //     if (err) return console.error("Ошибка: " + err.message)
        // })

        app.listen(PORT, () => {
            console.log(`NJMA run on http://localhost:${PORT}`)
        })
    }catch (e) {
        console.log(e)
        // закрытие подключения к базе данных
        // db.end(err => {
        //     if (err) return console.log("Ошибка: " + err.message)
        // })
    }
}

start()
