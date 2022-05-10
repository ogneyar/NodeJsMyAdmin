const authentication = require("../../service/api/auth/authentication")


class AuthController {

    async auth(req, res) {
        res.send(authentication())
        // return true
    }

    async logIn(req, res) {
        res.send("test")
        // return true
    }
}

module.exports = new AuthController()