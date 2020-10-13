import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, Switch, Route} from 'react-router-dom'
import { Layout, Button } from 'antd';
import {createDeleUserInfo} from '../../redux/actions/login_action'
import './css/admin.less'
import Header from './header/header'
import Home from '../../components/home/home'
import Bar from '../bar/bar'
import Category from '../category/category'
import Line from '../line/line'
import Pie from '../pie/pie'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import {reqCategoryList} from '../../api/index'
const {Footer, Sider, Content } = Layout;

class Admin extends Component{
  componentDidMount() {
    console.log(this.props)
  }

  demo = async() => {
    let result = await reqCategoryList()
    console.log(result)
  }
  render(){
      const {isLogin} = this.props.userInfo
      if(!isLogin){
        console.log("没有登录")
        return <Redirect to='/login'/>
      }else {
        console.log('登录了')
        return (
          
            <Layout className="admin">
              <Sider className="sider">Sider</Sider>
              <Layout>
                <Header/>
                <Content className="content">
                  <Switch>
                    <Route path='/admin/home' component={Home}></Route>
                    <Route path='/admin/prod_about/category' component={Category}></Route>
                    <Route path='/admin/prod_about/product' component={Product}></Route>
                    <Route path ='/admin/user' component={User}></Route>
                    <Route path = '/admin/role' component={Role}></Route>
                    <Route path = '/admin/bar' component={Bar}></Route>
                    <Route path = '/admin/charts/line' component={Line}></Route>
                    <Route path = '/admin/charts/pie' component={Pie}></Route>
                    <Redirect to='/admin/home'></Redirect> 
                  </Switch>
                </Content>
                <Footer>推荐使用谷歌浏览器，获取最佳体验
                  <Button onClick= {this.demo}>点我</Button>
                </Footer>
              </Layout>
            </Layout>
          
        )
      }
      
  }
}

export default connect(
  state => ({userInfo: state.userInfo}), 
  {
    deleteUserInfo: createDeleUserInfo
  }
)(Admin)