import React,{Component} from 'react'
import {Card, Button, Table, message, Modal, Form, Input, Tree} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import dayjs from 'dayjs'

import {reqRoleList, reqAddRole} from '../../api/index'
const {Item} = Form



export default class Role extends Component{

  state = {
    isShowAdd: false,
    isShowAuth: false,
    roleList: [],
   
    checkedKeys: [],
  
  }


  componentDidMount() {
    this.getRoleList()
  }

  getRoleList = async () => {
    let result = await reqRoleList()
    const {status, data, msg} = result
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
    const {status, data, msg} = result
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

  handleAuthOk = () => {
    this.setState({isShowAuth: false})

  }

  handleAuthCancel = () => {
    this.setState({isShowAuth: false})

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
        render: (item) => <Button type='link' onClick={()=>{this.setState({isShowAuth: true})}}>设置权限</Button>
      }
    ];

    const treeData = [
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
            children: [
              {
                title: '0-0-0-0',
                key: '0-0-0-0',
              },
              {
                title: '0-0-0-1',
                key: '0-0-0-1',
              },
              {
                title: '0-0-0-2',
                key: '0-0-0-2',
              },
            ],
          },
          {
            title: '0-0-1',
            key: '0-0-1',
            children: [
              {
                title: '0-0-1-0',
                key: '0-0-1-0',
              },
              {
                title: '0-0-1-1',
                key: '0-0-1-1',
              },
              {
                title: '0-0-1-2',
                key: '0-0-1-2',
              },
            ],
          },
          {
            title: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          {
            title: '0-1-0-0',
            key: '0-1-0-0',
          },
          {
            title: '0-1-0-1',
            key: '0-1-0-1',
          },
          {
            title: '0-1-0-2',
            key: '0-1-0-2',
          },
        ],
      },
      {
        title: '0-2',
        key: '0-2',
      },
    ];
    
    
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