
const db = require('../../../db')
const showDatabases = require('./showDatabases')


// showTables
async function showTables(name) {

    if ( ! name ) return { ok: false, error: "Отсутствует query параметр name." }

    let response

    response = await showDatabases()
    if ( ! response.ok ) return response

    const databases = response.result
    let yes = false
    databases.forEach(i => {
        if (i === name) yes = true
    })
    if ( ! yes ) return { ok: false, error: `Отсутствует база данных - ${name}.` }

    try {

        db.query(`USE ${name}`, (error, result) => {
            if (error) return { ok: false, error }
        })

        response = { ok: false }

        await new Promise((resolve, reject) => {
            db.query("SHOW TABLES", (error, result, fields) => {
                if (error) {
                    response.error = error
                }else {
                    response.ok = true
                    response.result = result.map(i => i[`Tables_in_${name}`])
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

module.exports = showTables