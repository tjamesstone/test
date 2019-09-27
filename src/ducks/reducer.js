//INITIAL STATE
const initialState = {
    username: '',
    id: 0,
    profile_pic: ''
}


//ACTION CONTS
const UPDATE_USER = 'UPDATE_USER'

//ACTION BUILDERS
export const updateUser = (userObj) => {
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}


//REDUCER FUNC
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            const {username, id, profile_pic} = action.payload
            return {
                ...state, username, id, profile_pic
            }
        default: return state
    }
}

export default reducer