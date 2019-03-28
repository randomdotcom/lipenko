import {
    SIGN_IN
} from '../actions/userActions'

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case SIGN_IN:
            return Object.assign({}, state, {
                username: action.username,
                email: action.email,
                phoneNumber: action.phoneNumber
            })
        default:
            return state
    }
}