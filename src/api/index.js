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
