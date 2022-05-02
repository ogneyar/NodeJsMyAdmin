const authentication = require("../../service/api/auth/authentication")


class AuthController {

    async auth(req, res, next) {
        return next(res.send(authentication()))
    }

    async logIn(req, res, next) {
        return res.send("test")
    }
}

module.exports = new AuthController()