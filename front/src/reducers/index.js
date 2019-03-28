import { combineReducers } from 'redux'
import userReducer from './userReducer'
import { routerReducer } from 'react-router-redux';

const combinedReducers = combineReducers({
    user: userReducer,
    routing: routerReducer,
})

export default combinedReducers