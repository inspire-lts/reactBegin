import React,{Component} from 'react'

import {withRouter} from 'react-router-dom'
import {Button} from 'antd'
import dayjs from 'dayjs'
import {connect} from 'react-redux'


import {createDeleUserInfo} from '../../../redux/actions/login_action'
import {reqWeather} from '../../../api/index'
import menuList from '../../../config/menu_config'
import './header.less'

@connect(
  state =>({userInfo: state.userInfo,
            title: state.title}),
  {deleteUser: createDeleUserInfo}
)
@withRouter  // 在非路由组建中使用路由组件的api
class Header extends Component{
  state = {
    date: dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
    weather: {},
    title: ''
  }

  getWeather = async() => {
    const weather = await reqWeather()
    this.setState({weather})
  }

  componentDidMount() {
    // 更新时间
    this.timeID = setInterval(() => {
      this.setState({date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')})
    }, 1000)
    // 发送天气请求
    this.getWeather()

    this.getTitle()  //产生bug 点一个菜单栏多个菜单都会响应
  }

  componentWillUnmount(){
    // 清除定时器
    clearInterval(this.timeID)
  }

  // 展示当前菜单名称
  getTitle = () => {
    let {pathname} = this.props.location
    let pathKey = pathname.split('/').reverse()[0] 
    if(pathname.indexOf('product') !== -1)  pathKey = 'product'
    let title = ''

    menuList.forEach(item => {
      if(item.children instanceof Array) {
        let tmp = item.children.find(citem => {
          return citem.key === pathKey 
        })
        if (tmp) title = tmp.title
      }else {
        if (pathKey === item.key) title = item.title
      }
    })

    this.setState({title})
  }

  logout = () => {
    this.props.deleteUser()
  }
  
  render(){
    const {user} = this.props.userInfo
    const {weather} = this.state
    return (
      <header className='header'>
        <div className="header-top">
    <span className="username">欢迎，{user.username}</span>
          <Button type='link' onClick={this.logout}>退出登录</Button>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>
            {this.props.title || this.state.title}
          </div>
          <div className='header-bottom-right'>
            <img src={weather.dayPictureUrl} alt="天气"/>
            {weather.weather} 温度： {weather.temperature}
          </div>
        </div>
      </header>
    )
  }
}

export default Header