import {combineReducers} from 'redux'
import loginReducer from './login_reducer.js'
import menuReducer from './menu_reducer.js'

export default combineReducers({
    userInfo:loginReducer,
    title: menuReducer
})