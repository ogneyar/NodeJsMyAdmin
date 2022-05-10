
const Router = class {
	
	constructor() {
		this.router = []
	}
		
	use(route, routes) {
		if (route === "/") route = ""
		routes.router.forEach(i => {
			this.router.push( { route: route + i.route, func: i.func } )
		})
	}

	get(route, func) {
		if (route.length > 0 && route[route.length - 1] !== "/") route += "/" 
		this.router.push( { route, func } )
	}
	
	post(route, func) {
		this.router.push( { route, func } )
	}    
}


module.exports = Router