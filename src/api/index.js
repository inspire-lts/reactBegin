import jsonp from 'jsonp'
import {message} from 'antd'
import { BASE_URL, WEATHER_CITY, WEATHER_KEY } from '../config/config'
import myAxiso from './myAxios'


export const  reqLogin = (username, password) => myAxiso.post(`${BASE_URL}/login`, {username, password})

export const reqCategoryList = () => myAxiso.get(`${BASE_URL}/manage/category/list`)

export const reqWeather = () => {
    return new Promise((resolve, reject) => {
        jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${WEATHER_CITY}&output=json&ak=${WEATHER_KEY}`,(err,data)=>{
            if(err){
              message.error('请求天气接口失败，请联系管理员')
              return new Promise(()=>{})
            }else{
              const {dayPictureUrl,temperature,weather} = data.results[0].weather_data[0]
              let weatherObj = {dayPictureUrl,temperature,weather}
              resolve(weatherObj)
            }
          })
    })
}

export const reqAddCategory = ({categoryName}) => myAxiso.post(`${BASE_URL}/manage/category/add`, {categoryName})

export const reqUpdateCategory = ({categoryId, categoryName}) => myAxiso.post(`${BASE_URL}/manage/category/update`, {categoryId, categoryName})

// 请求商品分页列表
export const reqPruductList = (pageNum, pageSize) => myAxiso.get(`${BASE_URL}/manage/product/list`, {params: {pageNum, pageSize}})

// 请求更新商品在售状态
export const reqUpdateProdStatus = (productId, status) =>  myAxiso.post(`${BASE_URL}/manage/product/updateStatus`, {productId, status})

// 搜索商品分页列表
export const reqSearchProduct = (pageNum, pageSize, searchType, keyWord) =>  myAxiso.get(`${BASE_URL}/manage/product/search`, {params: {pageNum, pageSize, [searchType]:keyWord}})

export const reqProdById = (productId) =>  myAxiso.get(`${BASE_URL}/manage/product/info`, {params: {productId}})

// 请求删除图片
export const reqDeletePicture = (name) => myAxiso.post(`${BASE_URL}/manage/img/delete`, {name})

// 请求添加商品
export const reqAddProduct = (productObj) => myAxiso.post(`${BASE_URL}/manage/product/add`, {...productObj})

// 请求更新商品
export const reqUpdateProduct = (productObj) => myAxiso.post(`${BASE_URL}/manage/product/update`, {...productObj})

// 请求所有角色列表
export const reqRoleList = () => myAxiso.get(`${BASE_URL}/manage/role/list`)

// 请求添加角色
export const reqAddRole = (roleName) => myAxiso.post(`${BASE_URL}/manage/role/add`, {...roleName})

// 给请求角色授权
export const reqAuthRole = (roleObj) => myAxiso.post(`${BASE_URL}/manage/role/update`, {...roleObj, auth_time: Date.now()})

// 请求获取所有用户列表（同时携带着角色列表)
export const reqUserList = () =>  myAxiso.get(`${BASE_URL}/manage/user/list`)

// 添加用户
export const reqAddUser = (userObj) => myAxiso.post(`${BASE_URL}/manage/user/add`, {...userObj})

// 更新用户
export const reqUpdateUser = (userObj) => myAxiso.post(`${BASE_URL}/manage/user/update`, {...userObj})

