import React,{Component} from 'react'
import login from './img/logo.png'
import { Form, Input, Button, message} from 'antd';
import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../api/index.js'
import './css/login.less'
import {connect} from 'react-redux'
import {createSaveUserInfo} from '../../redux/actions/login_action'



class Login extends Component{

  componentDidMount() {
    console.log(this.props)
  }
 
  render(){
    const {isLogin} = this.props
    if (isLogin) {
      return <Redirect to='/admin'></Redirect>
    }
    // 样式
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };
    // 成功回调
    const onFinish = async (values) => {
        const {username, password} = values
        console.log(values)
        const result = await reqLogin(username, password)
        const {status, msg, data} = result
        if (status === 0){  // 密码正确
            console.log(data)
            this.props.saveUserInfo(data)
            this.props.history.replace('/admin')
        }else {
          message.warning(msg)
        }
          
    };
    // 失败回调
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
      <div className="login">
        <header>
          <img src={login} alt="logo"/>
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form 
          {...layout}
          name="basic"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
                {
                  max: 12, 
                  message: "用户名必须小于等于12位"
                },
                {
                  min: 4,
                  message: "用户名必须大于等于4位"
                },
              
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
                {
                  validator: (_, value) => {
                    if(value.length >12) return Promise.reject("密码必须小于12位")
                    else if(value.length < 4) return Promise.reject("密码必须大于4位")
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}> 
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
      </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default connect(
  state => ({isLogin: state.userInfo.isLogin}),
  {
    saveUserInfo: createSaveUserInfo,
  }
)(Login)