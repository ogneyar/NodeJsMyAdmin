require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const router = require('./routes')
const path = require('path')
const PORT = process.env.PORT || 8800
const { spawn } = require("child_process")

const app = express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync() 
        app.listen(PORT, () => {
console.log(`Server run: http://localhost:${PORT}`))

const st = spawn("start", [`http://localhost:${PORT}`])

st.stdout.on("data", data => {
    console.log(`stdout: ${data}`)
})

st.stderr.on("data", data => {
    console.log(`stderr: ${data}`)
})

st.on('error', (error) => {
    console.log(`error: ${error.message}`)
})

st.on("close", code => {
    console.log(`child process exited with code ${code}`)
})

} 
    }catch (e) {
        console.log(e)
    }
}

start()
