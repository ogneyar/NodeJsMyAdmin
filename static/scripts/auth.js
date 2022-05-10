
// import parseRequestParams from "../../service/parseRequestParams.js"
// const parseRequestParams = require("../../service/parseRequestParams.js")

document.addEventListener("DOMContentLoaded", async () => {
    
    let njma_user_name = localStorage.getItem('njma_user_name')
    // если есть сохранённые данные о пользователе
    if (njma_user_name) {
        location.href = "main"
        return null
    // иначе если нет параметра without_dot_env в запросе (http://localhost:3465?without_dot_env=true)
    }else if ( ! parseRequestParams().without_dot_env ) { // если есть то пропустить аутентификацию на сервере
        
        let response = await fetch("/api/auth", { method: 'get' })
        if (response.ok) {
            let json = await response.json()
            if (json.ok) { 
                let { user, pass } = json.result
                localStorage.setItem('njma_user_name', user)
                localStorage.setItem('njma_user_pass', pass)

                location.href = "main"
                return null
            }else {
                console.log(JSON.stringify(json.error))
            }
        } else {
            alert("Ошибка HTTP: " + response.status)
        }

    }

    document.getElementById("loader").style.display = "none"
    
})

const onClickButtonEnter = async () => {

    let name = document.getElementById("user_name")
    let pass = document.getElementById("user_pass")

    if (! name.value) return null

    localStorage.setItem('njma_user_name', name.value)
    localStorage.setItem('njma_user_pass', pass.value)

    location.href="main"
    
}

// парсер параметров в запросе
const parseRequestParams = () => {

    let search = window.location.search.replace("?", "").split("&")
    let object = {}

    if (Array.isArray(search)) { 
        search.forEach(i => { 
            object[`${i.split("=")[0]}`] = i.split("=")[1] 
        }) 
    }

    return object
}