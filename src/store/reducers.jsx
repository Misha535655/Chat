const arrMessage = []
function jwtDecode(token){
    try{
        return JSON.parse(atob(token.split('.')[1]))
    }
    catch (e) {

    }
}


function promiseReducer(state={}, {type, status, name, payload, error}){ //payload
    if (type === 'PROMISE'){
        return {
            ...state,
            [name]: {status, payload ,error}
        }
    }
    return state 
}

function authReducer(state={}, {type, token}){
    if (type === 'AUTH_LOGIN'){
        const payload = jwtDecode(token)
        if (payload)
            return {token, payload}
    }
    if (type === 'AUTH_LOGOUT'){
        return {}
    }
    return state
}
function feedReducer(state, {type, name, payload}){
    if(!state) return {}

    if(type === "GET_ITEMS"){
        console.log(payload)
        arrMessage.length = 0
        payload.map((item) => arrMessage.push(item))
        return {arrMessage}
    }
    if(type === 'GET_SCROLL_ITEMS'){
        payload.map((item) => arrMessage.push(item))
        return {arrMessage}
    }

    return state

}
export {promiseReducer, authReducer, feedReducer}