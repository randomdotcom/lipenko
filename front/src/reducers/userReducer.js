import {
    CREATE_USER
} from '../actions/userActions'

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_USER:
            return Object.assign({}, state, {
                username: action.username,
                password: action.password,
                email: action.email,
                phoneNumber: action.phoneNumber
            })
        default:
            return state
    }
}