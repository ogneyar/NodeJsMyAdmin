// press button Exit 
const onClickExit = () => {
    localStorage.removeItem('njma_user_name')
    localStorage.removeItem('njma_user_pass')
    location.href = `${location.protocol}//${location.host}?without_dot_env=true`;
}

document.addEventListener("DOMContentLoaded", async () => {
    let response

    let njma_user_name = localStorage.getItem('njma_user_name')
    let njma_user_pass = localStorage.getItem('njma_user_pass')

    if (! njma_user_name ) return null

    let njma_db = document.getElementById("njma_db")

    let body = JSON.stringify({
        user: njma_user_name,
        pass: njma_user_pass
    })
    response = await fetch("/api/db", {
        method: "post",
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body
    })
    if (response.ok) {
        let json = await response.json()

        if (json.ok) {
            json.result.forEach(i => {
                let div = document.createElement('div')
                div.className = "db_item"
                div.id = `db_item_${i}`
                div.innerHTML = `<p>${i}</p>`
                div.onclick = () => onClickDbSelected(i)
                njma_db.append(div)
            })
        }else {
            alert(JSON.stringify(json.error))
        }
    } else {
        alert("Ошибка HTTP: " + response.status)
    }

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
        njma_page.innerHTML = ""

        let njma_db_selected = document.getElementById("njma_db_selected")
        njma_db_selected.innerHTML = ""

        let body = JSON.stringify({
            name,
            user: njma_user_name,
            pass: njma_user_pass
        })
        let response = await fetch("/api/db/select", {
            method: "post",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body
        })
        if (response.ok) {
            let json = await response.json()

            if (json.ok) {
                json.result.forEach(i => {
                    let div = document.createElement('div')
                    div.className = "db_selected_item"
                    div.innerHTML = `<p>${i}</p>`
                    div.onclick = () => onClickTableSelected(i)
                    njma_db_selected.append(div)
                })
            }else {
                alert(JSON.stringify(json.error))
            }
        } else {
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
        njma_page.innerHTML = ""

        let body = JSON.stringify({
            name,
            db_name: njma_db_name,
            user: njma_user_name,
            pass: njma_user_pass
        })
        let response = await fetch("/api/table/select", {
            method: "post",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body
        })
        if (response.ok) {
            let json = await response.json()

            if (json.ok) {
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
                alert(JSON.stringify(json.error))
            }
        } else {
            alert("Ошибка HTTP: " + response.status)
        }
    }

})