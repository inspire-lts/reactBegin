
import {createStore,applyMiddleware} from 'redux' 
//引入reducer
import reducer from './reducers/index.js'
//引入redux-thunk
import thunk from 'redux-thunk'
//引入redux-devtools-extension，用于支持redux开发者调试工具的运行
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))