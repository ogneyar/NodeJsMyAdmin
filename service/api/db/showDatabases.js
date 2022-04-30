
const db = require('../../../db')


// showDatabases
async function showDatabases() {

    let response = { ok: false }

    try {

        await new Promise((resolve, reject) => {
            db.query("SHOW DATABASES", (error, result, fields) => {
                if (error) {
                    response.error = error
                }else {
                    response.ok = true
                    response.result = result.filter(i => i.Database !== "information_schema" &&  i.Database !== "performance_schema").map(i => i.Database)
                }
                resolve(response)
            })
        }).then(data => {
            response = data
        })

    }catch(error) {
        
        console.log(error)
        response.error = error

    }
    
    return response
}

module.exports = showDatabases
// export default showDatabases