import React,{Component} from 'react'
import {Card, Button, Table, message, Modal, Form, Input, Select} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import dayjs from 'dayjs'

import {PANGE_SIZE} from '../../config/config'
import {reqUserList,reqAddUser, reqUpdateUser} from '../../api/index'



export default class User extends Component{


  state = {
    isShowAdd:false,
    isShowUpdate: false,
    userList: [], // 人员
    roleList: [],  // 角色
    operaType: '',
    user: ''

  }

  componentDidMount() {
    console.log(this.refs.formRef)
    this.getUserList()
  }

  getUserList = async() => {
    let result = await reqUserList()
    const {status, data, msg} = result
    if (status === 0) this.setState({
      userList: data.users.reverse(),
      roleList: data.roles
    })
  }

  handleOk = () => {
    this.setState({isShowAdd: false})
    this.refs.formRef.submit()  //提交表单
    
  }

  
  handleCancel = () => {
    this.setState({isShowAdd: false})
    this.refs.formRef.resetFields()  // 表单清空
  }

  /* 表单相关开始 */
  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

 onFinish = async values => {
    let result
    if(this.state.operaType === 'add'){  //添加
      result = await reqAddUser(values)
      const {status, data, msg} = result
      if (status === 0) {
        message.success('操作成功')
        let userList = [...this.state.userList]
        userList.unshift(data)
        this.setState({userList, isShowAdd: false})
      }
      else message.error(msg)
    }
    else {    // 更新 替换找到的
      values._id = this.state.user._id
      result = await reqUpdateUser(values)
      const {status, data, msg} = result
      if (status === 0) {   
        message.success('操作成功')
        this.getUserList()

      }
    }
    
    this.refs.formRef.resetFields()  // 表单清空
    
  }
  
  /* 表单结束 */

  handleUpdate = (id) => {
    let user = this.state.userList.find(item => item._id === id)
    console.log('result', user)
    this.setState({user})
    this.refs.formRef.setFieldsValue({...user})  //数据回显
    this.setState({isShowAdd: true, operaType: 'update'})
  }
 
  handleAdd = () => {
    this.setState({isShowAdd: true, operaType: 'add'})
  }
  render(){
    const dataSource = this.state.userList
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: time => dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
        render:(id)=>{
          let result = this.state.roleList.find((item)=>{
            return item._id === id
          })
          if(result) return result.name
        }
      },
      {
        title: '操作',
        key: 'option',
        render: (item) => (
          <div>
            <Button 
              type='link' 
              onClick={() =>this.handleUpdate(item._id)}
             >修改
            </Button>
            <Button 
              type='link' 
             >删除
            </Button>
          </div>
          )
      }
    ];
    // 表单布局
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    return (
      <div>
        <Card title={<Button type='primary' onClick={this.handleAdd}><PlusOutlined/>新增角色</Button>}>
        <Table dataSource={dataSource} columns={columns} bordered rowKey='_id'  pagination={{defaultPageSize:PANGE_SIZE}}/>;
        </Card>
        <Modal
          title={this.state.operaType === 'add' ? '新增角色' : '修改角色'}
          visible={this.state.isShowAdd}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确认'
          cancelText='取消'
          forceRender > {/*强制渲染，不然modal渲染Form没实例化*/}
            <Form
            {...layout}
            ref='formRef'
            name='basic'
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            >
            <Form.Item 
              label='姓名'
              name='username'
              rules={[{ required: true, message: '请输入姓名' }]}>
              <Input/>
            </Form.Item>
            <Form.Item 
              label='密码'
              name='password'
              rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password/>
            </Form.Item>
            <Form.Item 
              label='手机号'
              name='phone'
              rules={[{ required: true, message: '请输入手机号' }]}>
              <Input/>
            </Form.Item>
            <Form.Item 
              label='邮箱'
              name='email'
              rules={[{ required: true, message: '请输入邮箱' }]}>
              <Input/>
            </Form.Item>
            <Form.Item 
              label='角色'
              name='role_id'
              rules={[{ required: true, message: '请选择角色' }]}>
              <Select >
                {this.state.roleList.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)}
              </Select>
            </Form.Item>
          </Form>
        
        </Modal>
      </div>
      
    )
  }
}