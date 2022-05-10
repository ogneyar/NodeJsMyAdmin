
// parseRequestParams
// ?test=true&temp=false  =>  { test: true, temp: false }
// const parseRequestParams = () => {
export default () => {

    let search = window.location.search.replace("?", "").split("&")
    // alert("search")
    let object = {}
    if (Array.isArray(search)) { search.forEach(i => { object[`${i.split("=")[0]}`] = i.split("=")[1] }) }

    return object
}

// export default parseRequestParams