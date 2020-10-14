import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Button} from 'antd'
import dayjs from 'dayjs'
import './header.less'
import {connect} from 'react-redux'
import {createDeleUserInfo} from '../../../redux/actions/login_action'
import {reqWeather} from '../../../api/index'


@connect(
  state =>({userInfo: state.userInfo}),
  {deleteUser: createDeleUserInfo}
)
@withRouter  // 在非路由组建中使用路由组件的api
class Header extends Component{
  state = {
    date: dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
    weather: {}
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
  }

  componentWillUnmount(){
    // 清除定时器
    clearInterval(this.timeID)
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
            {this.props.location.pathname}
          </div>
          <div className='header-bottom-right'>
            {this.state.date}
            <img src={weather.dayPictureUrl} alt="天气"/>
            {weather.weather} 温度： {weather.temperature}
          </div>
        </div>
      </header>
    )
  }
}

export default Header