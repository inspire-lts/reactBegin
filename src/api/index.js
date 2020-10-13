
import { BASE_URL } from '../config/config'
import myAxiso from './myAxios'

export const  reqLogin = (username, password) => myAxiso.post(`${BASE_URL}/login`, {username, password})

export const reqCategoryList = () => myAxiso.get(`${BASE_URL}/manage/category/list`)
