
const http = require('http')
const fs = require('fs')
const path = require('path')


const Server = class {
	
	constructor() {
		this._staticPath = ""
		this._faviconPath = ""
		this._router = []
		this._server = null
		this._response = null
		this._request = null

		this._run()
	}
		
    _run() { 
    	this._server = http.createServer((req, res) => {
			this._req = req
			this._res = res
			// парсер параметров get запроса ("?temp=true&test=false")
			this._req.params = this._parseParams()
 			// если в запросе найден файл, то выйти из метода _run
			if (this._files()) return null

			// добавление методов
			this._res.sendHtml = (html) => this._sendHtml(html)
			this._res.sendFile = this._res.sendHtml
			this._res.sendJson = (json) => this._sendJson(json)
			this._res.send = this._res.sendJson
	    	
	    	let no = true // флаг для роутера
	    	let url = this._req.url.split('?')[0]
			if (url !== "/" && url[url.length - 1] !== "/") url += "/"
	    	this._router.forEach(i => { // перебор роутов
				// if (i.route !== "/" && i.route[i.route.length - 1] === "/") i.route = i.route.substring(0, i.route.length - 1)
	    		if (i.route === url) { // если найден,
	    			no = false
	    			i.func(this._req, this._res) // то вызывается функция
	    		}
	    	})
	    	if (no) { // если не было найдено ни одного роута
	    		this._res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
	    		this._res.end('Error 404 Page Not Found') // возвращается Page Not Found
	    	}
		})
    }
	
	// use (:
	use(route, routes) {
		if (route === "/") route = ""
		routes.router.forEach(i => {
			this._router.push( {route: route + i.route, func: i.func} )
		})
	}

	// get запросы
	get(route, func) {
		if (route.length > 0 && route[route.length - 1] !== "/") route += "/" 
		this._router.push( { route, func } )
	}
	
	// post запросы
	post(route, func) {
		this._router.push( { route, func } )
	}
	
	// запуск прослушивания порта
    listen(...args) { 
    	if (this._server) this._server.listen(...args)
    }

	// сохранение пути к статическим данным
	static(staticPath) {
		this._staticPath = staticPath
	}

	// сохранение пути к favicon
	favicon(faviconPath) {
		this._faviconPath = faviconPath
	}

	// парсер параметров get запроса ("?temp=true&test=false")
	_parseParams() {
		return this._req.url.split('?')[1] 	// если в запросе есть знак вопроса
			?							// то
				JSON.parse(				// переводим строку в объект
					"{" + this._req.url
						.split('?')[1]	// берём значение после знака вопроса
						.split("&") 	// делим по знаку амперсанта
						// в в цикле переводим строку из "temp=true&test=false" в массив [`"temp":"true"`,`"test":"false"`]
						.map(i => `"${i.split("=")[0]}":"${i.split("=")[1]}"`) 
						.join(',') 		// переводим массив в строку, объединяя запятой - `"temp":"true","test":"false"`
					+ "}"
				) 
			: undefined 				// иначе возвращаем undefined

	}

	// передача файла
	_sendHtml(file) {
		let url = this._staticPath 
		? file.indexOf(this._staticPath) === 0 
			? file 
			: path.join(this._staticPath, file)
		: file
		fs.readFile(url, (err, html) => {
			if (err) {
				this._res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
				this._res.end(err.toString())
			}
			this._res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
			this._res.end(html.toString())
		})
	}

	_sendJson(json) {
		this._res.writeHead(200, {'Content-Type': 'application/json'})
		// this._res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
		if (typeof(json) === "object") json = JSON.stringify(json)
		this._res.end(json)
	}

	_files() {
		let url = this._req.url
		if (url.split('.')[1] !== undefined) {
			// favicon файл
			if (url.split('.')[1] === "ico") {
				if ( ! this._faviconPath) return true
				try{
					let ico = fs.readFileSync(path.join(this._staticPath, url))
					
					this._res.writeHead(200, {'Content-Type': 'image/x-icon'})
					this._res.end(ico.toString())
				}catch(err) {
					this._res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
					this._res.end(err.toString())
				}
				return true
			}
			
			// javascript файлы
			if (url.split('.')[1] === "js") {
				try{
					let js = fs.readFileSync(path.join(this._staticPath, url))
					
					this._res.writeHead(200, {'Content-Type': 'text/javascript'})
					this._res.end(js.toString())
				}catch(err) {
					this._res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
					this._res.end(err.toString())
				}
				return true
			}

			// css файлы
			if (url.split('.')[1] === "css") {
				try{
					let css = fs.readFileSync(path.join(this._staticPath, url))
					
					this._res.writeHead(200, {'Content-Type': 'text/css'})
					this._res.end(css.toString())
				}catch(err) {
					this._res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
					this._res.end(err.toString())
				}
				return true
			}
		}
		return null
	}
}


module.exports = () => new Server()