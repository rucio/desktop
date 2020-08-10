const initialState = {
    loggedIn: false
}

function loginReducer(state = initialState.loggedIn, action){
    switch (action.type) {
        case "LOG_IN":
            return true
        case "LOG_OUT":
            return false
        default:
            return state
    }
}

export default loginReducer