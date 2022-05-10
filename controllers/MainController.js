
const path = require('path')


class MainController {
    async start(req, res) {
                
        res.sendFile(path.join(__dirname,'..','static', 'pages', 'main.html'))
        // res.sendFile(path.join('pages', 'main.html'))
        return true
    }
}

module.exports = new MainController()