import axios from 'axios'
import {message} from 'antd'
import qs from 'querystring'
import store from '../redux/store'
import {createDeleUserInfo} from '../redux/actions/login_action'
const instance = axios.create({
    timeout: 4000
})

instance.interceptors.request.use(config =>{
    const {token} = store.getState().userInfo
    if(token) config.headers.Authorization = 'atguigu_' + token
    const {method, data} = config
    if(method.toUpperCase() === 'POST'){
        if(data instanceof Object){
            config.data = qs.stringify(data)
        }
    }
    return config
})

instance.interceptors.response.use(
    res => res.data,
    error =>{
        if(error.response.status === 401){
            message.error('身份校验失败，请重新登录')
            //分发一个删除用户信息的action
            store.dispatch(createDeleUserInfo())
        }else{
            message.error(error.message)
        }
        return new Promise(() => {})
    }
)
export default instance