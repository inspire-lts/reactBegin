import {combineReducers} from 'redux'
import loginReducer from './login_reducer.js'

export default combineReducers({
    userInfo:loginReducer
})