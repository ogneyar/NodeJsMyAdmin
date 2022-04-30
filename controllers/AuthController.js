
const path = require('path')


class AuthController {
    async auth(req, res, next) {
                
        return res.sendFile(path.join(__dirname,'..','static', 'pages', 'auth.html'))
    }
}

module.exports = new AuthController()