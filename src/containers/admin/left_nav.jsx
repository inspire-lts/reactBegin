import React, { Component } from 'react'
import { Menu, Button } from 'antd';
import {Link} from 'react-router-dom'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  HomeFilled,
} from '@ant-design/icons';
import logo from '../../static/imgs/logo.png'
import './left_nav.less'

const { SubMenu } = Menu;

export default class LeftNav extends React.Component {

  
    render() {
      return (
        <div>
            <header className="nav-header">
                <img src={logo} alt=""/>
                <h1>商品管理系统</h1>
            </header>
          <Menu
            defaultSelectedKeys={'home'}
            mode="inline"
            theme="dark"
          >
            <Menu.Item key="home" icon={<HomeFilled />}>
                <Link to='/admin/home'>
                    首页
                </Link>
            </Menu.Item>
            <SubMenu key="prod_about" icon={<AppstoreOutlined />} title="商品">
              <Menu.Item key="5">
                  <Link to='/admin/prod_about/category'>
                      分类管理
                  </Link>
                  </Menu.Item>
              <Menu.Item key="6">
                 <Link to='/admin/prod_about/product'>
                     商品管理
                 </Link>             
              </Menu.Item>
              
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
      );
    }
  }
