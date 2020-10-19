import {combineReducers} from 'redux'
import loginReducer from './login_reducer.js'
import menuReducer from './menu_reducer.js'
import productReducer from './product_reducer'
import categoryReducer from './category_reducer'

export default combineReducers({
    userInfo:loginReducer,
    title: menuReducer,
    productList: productReducer,
    categoryList:categoryReducer
})