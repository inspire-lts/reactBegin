import React,{Component} from 'react'
import {Card, Button, Table, message, Modal, Form, Input, Tree} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import dayjs from 'dayjs'
import {connect} from 'react-redux'

import {reqRoleList, reqAddRole, reqAuthRole} from '../../api/index'
import menuList from '../../config/menu_config.js'




@connect(
  state => ({username: state.userInfo.user.username}),
  {}
)
class Role extends Component{

  state = {
    isShowAdd: false,
    isShowAuth: false,
    roleList: [],
    menuList,
    checkedKeys: [],
  
  }


  componentDidMount() {
    this.getRoleList()
  }

  getRoleList = async () => {
    let result = await reqRoleList()
    const {status, data} = result
    if (status === 0) this.setState({roleList: data})
  }

  // 新增角色确认弹窗
  handleOk = () => {
    this.setState({isShowAdd: false})
    this.refs.formInstance.submit()
  }
  // 新增角色取消弹窗
  handleCancel = () => {
    this.refs.formInstance.resetFields()
    this.setState({isShowAdd: false})
  }

  onFinish = async values => {
    let result = await reqAddRole(values)
    const {status} = result
    if (status === 0){
      message.success('新增角色成功')
      this.getRoleList()
    }
    this.refs.formInstance.resetFields()
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  //  权限

  handleAuthOk = async() => {
    const {_id, checkedKeys} = this.state
    const {username} = this.props
    let result = await reqAuthRole({_id, menus:checkedKeys, auth_name: username})
    const {status, data, msg} = result
    if (status === 0) {
      message.success('授权成功')
      this.setState({isShowAuth: false})
      this.getRoleList()   // 刷新
    }
    console.log({_id, menus:checkedKeys, auth_name: username})
   

  }

  handleAuthCancel = () => {
    this.setState({isShowAuth: false})

  }



  // 展示授权弹窗
  showAuth = (id) => {
    //回显权限
    const {roleList} = this.state
    let result = roleList.find(item => item._id === id)
    this.setState({checkedKeys: result.menus})
    // 展开授权弹窗
    this.setState({isShowAuth: true, _id:id})
  }
    
  
// tree
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys})
    
  };




  render(){
   
    const dataSource = this.state.roleList

    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(time)=> dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render:(time)=> time ? dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss') : ''
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
      },
      {
        title: '操作',
        key: 'option',
        render: (item) => <Button type='link' onClick={()=>{this.showAuth(item._id)}}>设置权限</Button>
      }
    ];

    const treeData =   this.state.menuList
                      
    
    
    return (
      <div>
        <Card title={<Button type='primary' onClick={() => this.setState({isShowAdd: true})}><PlusOutlined/>新增角色</Button>}>
        <Table dataSource={dataSource} columns={columns} bordered rowKey='_id'  pagination={{defaultPageSize:5}}/>;
        </Card>
        <Modal
          title="新增角色"
          visible={this.state.isShowAdd}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form
            ref='formInstance'
            name='basic'
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}>
            <Form.Item name='roleName'
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input/>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="新增角色"
          visible={this.state.isShowAuth}
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
          okText="确认"
          cancelText="取消"
        >
          <Tree
              checkable  // 允许选择
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
              defaultExpandAll   // 默认全部展开
              treeData={treeData}
            />
        
        </Modal>
      </div>
    )
  }
}

export default Role