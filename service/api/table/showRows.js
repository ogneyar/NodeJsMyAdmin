// showRows

// const db = require('../../../db')
const conector = require('../../../db')

/* 
// name - database name
// user - user name
// pass - user password
// host - by default = "localhost"
*/
async function showRows({ name, db_name, limit, user, pass, host }) {
    
    if ( ! name ) return { ok: false, error: "Отсутствует параметр name." }
    
    let response

    let db = conector(user, pass, host)

    try {

        db.query(`USE ${db_name}`, (error, result) => {
            if (error) return { ok: false, error }
        })

        response = { ok: false }

        await new Promise((resolve, reject) => {
            // db.query("SELECT * FROM ?", [name], (error, result, fields) => {
            let query= `SELECT * FROM ${name}`
            if (limit != 0) query += ` LIMIT ${limit}`
            db.query(query, (error, result, fields) => {
                if (error) {
                    response.error = error
                }else {
                    response.ok = true
                    response.result = result//.map(i => i[`Tables_in_${name}`])
                }
                resolve(response)
            })
        }).then(data => {
            response = data
        })

    }catch(error) {
        console.log(JSON.stringify(error))
        response.error = error
    }
     
    return response
    
}

module.exports = showRows