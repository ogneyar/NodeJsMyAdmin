
const path = require('path')


class MainController {
    async start(req, res) {
        // можно так
        // return res.sendFile(path.join(__dirname,'..','static', 'pages', 'main.html'))

        // или так
        return res.sendFile(path.join('pages', 'main.html'))
    }
}

module.exports = new MainController()