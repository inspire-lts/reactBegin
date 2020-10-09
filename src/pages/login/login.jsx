import React,{Component} from 'react'
import login from './img/logo.png'
import { Form, Input, Button, Checkbox} from 'antd';
import './css/login.less'

export default class Login extends Component{
 
  render(){
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
    const onFinish = (values) => {
      console.log('Success:', values);
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
                  validator: (_, value) => {
                    if(!value) return Promise.reject("密码不能为空")
                    else if(value.length >12) return Promise.reject("密码必须小于12位")
                    else if(value.length < 4) return Promise.reject("密码必须大于4位")
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
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