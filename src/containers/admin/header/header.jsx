import React,{Component} from 'react'
import {Button} from 'antd'
import './header.less'
import {connect, Connect} from 'react-redux'

@connect(
  state =>({userInfo: state.userInfo}),
  {}
)
class Header extends Component{
  render(){
    const {user} = this.props.userInfo
    return (
      <header className='header'>
        <div className="header-top">
    <span className="username">欢迎，{user.username}</span>
          <Button type='link'>退出登录</Button>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>
            柱状图
          </div>
          <div className='header-bottom-right'>
            2020-10-13 16:52:40
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气"/>
            晴 温度： 20
          </div>
        </div>
      </header>
    )
  }
}

export default Header