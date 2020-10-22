import React, { Component } from 'react'

import { Menu} from 'antd';
import {Link, withRouter} from 'react-router-dom'

import {connect} from 'react-redux'

import menuList from '../../config/menu_config.js'
import {createSaveTitleActon} from '../../redux/actions/menu_action.js'
import logo from '../../static/imgs/logo.png'
import './left_nav.less'

const { SubMenu, Item } = Menu;

@connect(
  state => ({menus: state.userInfo.user.role.menus, username: state.userInfo.user.username}),
  {
    saveTitle: createSaveTitleActon
  }
)
@withRouter
class LeftNav extends Component {


    hasAuth = (item) => {
      const {username, menus} = this.props
      if (username === 'admin') return true
      else if (!item.children)  return menus.find(itemMenus => itemMenus === item.key)
      else return item.children.find(item2 => menus.indexOf(item2.key) !== -1)
      
    }
    
    createMenu = (tartget) => {
      return tartget.map((item) => {
        if (this.hasAuth(item)){
          if (!item.children) {
            return (
              <Item key={item.key} onClick={() => {this.props.saveTitle(item.title)}} >
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </Item>
            )
          }else {
            return (
              <SubMenu key={item.key} title = {item.title}>
                {this.createMenu(item.children)}
              </SubMenu>
            )
          }
        }
      })
    }

    render() {
      let {pathname} = this.props.location
      return (
        <div>
            <header className="nav-header">
                <img src={logo} alt=""/>
                <h1>商品管理系统</h1>
            </header>
          <Menu
            defaultSelectedKeys={pathname.indexOf('product') !== -1 ? 'product' : pathname.split('/').reverse()[0]}
            defaultOpenKeys={pathname.split('/').splice(2)}
            mode="inline"
            theme="dark"
          >
            {
              this.createMenu(menuList)
            }
          </Menu>
        </div>
      );
    }
  }

  export default LeftNav
