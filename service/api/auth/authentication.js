
require('dotenv').config()

// authentication
module.exports = () => {
    let response = { ok: false }

    let user = process.env.DB_USER
    let pass = process.env.DB_PASS

    if (user) {
        response.ok = true
        response.result = {
            user,
            pass
        }
    }else {
        response.error = "Нет данных о пользователе."
    }

    return response
}