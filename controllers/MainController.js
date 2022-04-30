
const path = require('path')


class MainController {
    async start(req, res, next) {
                
        return res.sendFile(path.join(__dirname,'..','static', 'pages', 'main.html'))
    }
}

module.exports = new MainController()