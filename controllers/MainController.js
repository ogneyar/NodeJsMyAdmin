
const path = require('path')


class MainController {
    async start(req, res) {
                
        return res.sendFile(path.join(__dirname,'..','static', 'pages', 'main.html'))
        return res.sendFile(path.join('pages', 'main.html'))
    }
}

module.exports = new MainController()