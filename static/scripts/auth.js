
document.addEventListener("DOMContentLoaded", async () => {

    let njma_user_name = localStorage.getItem('njma_user_name')
    // let njma_user_pass = localStorage.getItem('njma_user_pass')
    if (njma_user_name) {
        location.href = "main"
        return null
    }else {
        let response = await fetch("/api/auth", { method: 'post' })
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

        document.getElementById("loader").style.display = "none"
    }
    
})

const onClickButtonEnter = async () => {

    let name = document.getElementById("user_name")
    let pass = document.getElementById("user_pass")

    if (! name.value) return null

    localStorage.setItem('njma_user_name', name.value)
    localStorage.setItem('njma_user_pass', pass.value)

    location.href="main"
    
}
