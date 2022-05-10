// press button Exit 
const onClickExit = () => {
    localStorage.removeItem('njma_user_name')
    localStorage.removeItem('njma_user_pass')
    location.href = `${location.protocol}//${location.host}?without_dot_env=true`;
}

document.addEventListener("DOMContentLoaded", async () => {

    let njma_user_name = localStorage.getItem('njma_user_name')
    let njma_user_pass = localStorage.getItem('njma_user_pass')

    if (! njma_user_name ) return null

    let njma_db = document.getElementById("njma_db")
    njma_db.innerHTML = `загрузка данных...`

    // let body = JSON.stringify({
    //     user: njma_user_name,
    //     pass: njma_user_pass
    // })
    
    let xhr = new XMLHttpRequest()
    // xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
    xhr.open('GET', "/api/db" + `?user=${njma_user_name}&pass=${njma_user_pass}`, false)
    xhr.send()
    if (xhr.status === 200) {
        let json = JSON.parse(xhr.responseText)
        if (json.ok) {
            njma_db.innerHTML = ``
            json.result.forEach(i => {
                let div = document.createElement('div')
                div.className = "db_item"
                div.id = `db_item_${i}`
                div.innerHTML = `<p>${i}</p>`
                div.onclick = () => onClickDbSelected(i)
                njma_db.append(div)
            })
        }else {
            njma_db.innerHTML = `Ошибка...`
            alert(JSON.stringify(json.error))
        }
    }else {
        njma_db.innerHTML = `Ошибка...`
        alert(JSON.stringify(json.error))
    }
    
    // let response = await fetch("/api/db" + `?user=${njma_user_name}&pass=${njma_user_pass}`, {
    //     method: "get",
    //     // headers: { 'Content-Type': 'application/json; charset=utf-8' },
    //     // body
    // })
    // if (response.ok) {
    //     let json = await response.json()

    //     if (json.ok) {
    //         njma_db.innerHTML = ``
    //         json.result.forEach(i => {
    //             let div = document.createElement('div')
    //             div.className = "db_item"
    //             div.id = `db_item_${i}`
    //             div.innerHTML = `<p>${i}</p>`
    //             div.onclick = () => onClickDbSelected(i)
    //             njma_db.append(div)
    //         })
    //     }else {
    //         alert(JSON.stringify(json.error))
    //     }
    // }else {
    //     alert("Ошибка HTTP: " + response.status)
    // }

    // выбор базы данных
    const onClickDbSelected = async (name) => {

        let njma_user_name = localStorage.getItem('njma_user_name')
        let njma_user_pass = localStorage.getItem('njma_user_pass')
    
        if (! njma_user_name ) return null
        
        // toggle class active
        let db_item = document.getElementsByClassName(`db_item`)
        for(let i = 0; i < db_item.length; i++) {
            // if (db_item[i].id === `db_item_${name}`) {
            if (db_item[i].innerHTML === `<p>${name}</p>`) {
                db_item[i].className = "db_item active"
            }else {
                db_item[i].className = "db_item"
            }
        }

        let njma_page = document.getElementById("njma_page")
        njma_page.innerHTML = ``

        let njma_db_selected = document.getElementById("njma_db_selected")
        njma_db_selected.innerHTML = `загрузка данных...`

        // let body = JSON.stringify({
        //     name,
        //     user: njma_user_name,
        //     pass: njma_user_pass
        // })
        let response = await fetch("/api/db/select" + `?name=${name}&user=${njma_user_name}&pass=${njma_user_pass}`, {
            method: "get",
            // headers: { 'Content-Type': 'application/json; charset=utf-8' },
            // body
        })
        if (response.ok) {
            let json = await response.json()

            if (json.ok) {
                njma_db_selected.innerHTML = ``
                json.result.forEach(i => {
                    let div = document.createElement('div')
                    div.className = "db_selected_item"
                    div.innerHTML = `<p>${i}</p>`
                    div.onclick = () => onClickTableSelected(i)
                    njma_db_selected.append(div)
                })
            }else {
                njma_db_selected.innerHTML = `Ошибка...`
                alert(JSON.stringify(json.error))
            }
        }else {
            njma_db_selected.innerHTML = `Ошибка...`
            alert("Ошибка HTTP: " + response.status)
        }

        localStorage.setItem('njma_db_name', name)
    }

    // выбор таблицы
    const onClickTableSelected = async (name) => {

        let njma_user_name = localStorage.getItem('njma_user_name')
        let njma_user_pass = localStorage.getItem('njma_user_pass')
        let njma_db_name = localStorage.getItem('njma_db_name')
    
        if (! njma_user_name ) return null

        let njma_page = document.getElementById("njma_page")
        njma_page.innerHTML = `загрузка данных...`

        // let body = JSON.stringify({
        //     name,
        //     db_name: njma_db_name,
        //     user: njma_user_name,
        //     pass: njma_user_pass
        // })
        let response = await fetch("/api/table/select" + `?name=${name}&db_name=${njma_db_name}&user=${njma_user_name}&pass=${njma_user_pass}`, {
            method: "get",
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            // body
        })
        if (response.ok) {
            let json = await response.json()

            if (json.ok) {
                njma_page.innerHTML = ``
                if ( Array.isArray(json.result) && ! json.result[0]) {
                    let div = document.createElement('div')
                    div.className = "table_selected_item"
                    div.innerHTML = `<p>Пусто</p>`
                    njma_page.append(div)
                }else {
                    json.result.forEach(i => {
                        let div = document.createElement('div')
                        div.className = "table_selected_item"
                        div.innerHTML = `<p>${JSON.stringify(i)}</p>`
                        njma_page.append(div)
                    })
                }
            }else {
                njma_page.innerHTML = `Ошибка...`
                alert(JSON.stringify(json.error))
            }
        }else {
            njma_page.innerHTML = `Ошибка...`
            alert("Ошибка HTTP: " + response.status)
        }
    }

})