const initialState = {
    username: '',
    profile_pic: ''
}

const HANDLE_USER = "HANDLE_USER"
const CLEAR_STATE = "CLEAR_STATE"

export const handleUser = (username, profile_pic) => {
    let user = {username, profile_pic}
    return {
        type: HANDLE_USER,
        payload: user
    }
}

export const clearState = () => {
    return {
        type: CLEAR_STATE
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case CLEAR_STATE:
            console.log()
            return {...state, username: '', profile_pic: ''}
        case HANDLE_USER:
            return {...state, username: action.payload.username, profile_pic: action.payload.profile_pic}
        default:
            return state
    }
}

export default reducer