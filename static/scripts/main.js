
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
                div.innerHTML = `<strong>${i}</strong>`
                div.onclick = () => onClickDbSelected(i)
                njma_db.append(div)
            })
        }else {
            alert(JSON.stringify(json.error))
        }
    } else {
        alert("Ошибка HTTP: " + response.status)
    }


    const onClickDbSelected = async (name) => {

        let njma_user_name = localStorage.getItem('njma_user_name')
        let njma_user_pass = localStorage.getItem('njma_user_pass')
    
        if (! njma_user_name ) return null

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
                    div.innerHTML = `<strong>${i}</strong>`
                    njma_db_selected.append(div)
                })
            }else {
                alert(JSON.stringify(json.error))
            }
        } else {
            alert("Ошибка HTTP: " + response.status)
        }
    }

})