
require('dotenv').config()

// authentication
module.exports = () => {
    let response = { ok: false }

    if (process.env.DB_USER) {
        response.ok = true
        response.result = {
            user: process.env.DB_USER,
            pass: process.env.DB_PASS
        }
    }else {
        response.error = "Нет данных о пользователе."
    }

    return response
}