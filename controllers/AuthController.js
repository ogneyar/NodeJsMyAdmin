
class AuthController {
    async auth(req, res, next) {
        
        return res.redirect('/start')
    }
}

module.exports = new AuthController()