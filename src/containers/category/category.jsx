import React,{Component} from 'react'

import {Card, Button, Table, message, Modal, Form, Input} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'

import {reqCategoryList, reqAddCategory, reqUpdateCategory} from '../../api/index'
import {PANGE_SIZE} from '../../config/config'
import {createSaveCategoryAction} from '../../redux/actions/category_action'

@connect(
  state => ({}),
  {saveCategory: createSaveCategoryAction}
)
 class Category extends Component{

  formRef = React.createRef();

  state = {
    categoryList: [], // 商品分类列表
    visible: false , // 弹窗是否显示
    operType: '',
    isLoading: true,
    modalCurrentValue: '',  //弹窗显示的值---用于数据回写
    modalCurrentId: ''  // 
  }

  getCategoryList = async() => {
    let result = await reqCategoryList()
    this.setState({isLoading: false})
    const {status, data, msg} = result
    if(status === 0) {
      this.setState({categoryList: data.reverse()})
      // 把商品的分类信息放入redux
      this.props.saveCategory(data)
    }
    else message.error(msg, 1)
  }
  componentDidMount() {
    this.getCategoryList()
  }

  showAdd = () => {
    this.setState({
      operType: "add",
      visible: true,
    });
  };

  showUpdata = (item) => {
    const {_id,name} = item
    this.setState({
      operType: "update",
      visible: true,
      modalCurrentValue:name,
      modalCurrentId: _id
    });
  };

  handleOk = () => {

    this.formRef.current.submit()
    //this.formRef.current.resetFields();
  };

  toAdd = async (values) => {
    console.log("add", values)
    let result = await reqAddCategory(values)
    const {status, data, msg} = result
    if (status === 0) {
      message.success('新增商品分类成功')
      let categoryList = [...this.state.categoryList]
      categoryList.unshift(data)
      this.setState({categoryList})
      this.setState({
        visible: false,
      });
      this.formRef.current.resetFields()
    }
    if (status === 1) message.error(msg, 1)
  }

  toUpdate = async (categoryObj) => {
    let result = await reqUpdateCategory(categoryObj)
    const {status, msg} = result
    if (status === 0) {
      message.success('更新分类名称成功', 1)
      this.getCategoryList()
      this.setState({visible: false})
      this.formRef.current.resetFields()
    }else {
      message.error(msg.message)
    }
  }
  handleCancel = () => {
    this.formRef.current.resetFields(); 
    this.setState({
      visible: false,
    });
  };

   onFinish =  (values) => {
    const {operType} = this.state
    if (operType === 'add') this.toAdd(values)
    if (operType === 'update') {
      const categoryId = this.state.modalCurrentId
      const categoryName = values.categoryName
      const categoryObj = {categoryId, categoryName}
      this.toUpdate(categoryObj)
    }
   
  }
  render(){
    const dataSource = this.state.categoryList
    
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        render: (item) => <Button type="link" onClick={() => {this.showUpdata(item)}}>修改分类</Button>,
        width: '25%',
        align: 'center'
      },
      
    ];
    
    
    return (
      <div>
        <Card  extra={<Button type="primary" onClick={this.showAdd}><PlusOutlined />添加</Button>} >
          <Table dataSource={dataSource} columns={columns} bordered rowKey='_id' pagination={{pageSize: PANGE_SIZE, showQuickJumper: true}} isLoading={this.state.isLoading}/>
        </Card>
        <Modal
          title= {this.state.operType === 'add' ? '新增分类' : '修改分类'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确定'
          cancelText='取消'
        >
          <Form initialValues={{ remember: true }} 
          ref={this.formRef}
          onFinish={this.onFinish}
          name='categoryForm'>
            <Form.Item
             rules={[
               {required: true,
                message: '请输入内容'}
             ]}
             name='categoryName'
             >
              <Input placeholder='请输入分类名' />
              
            </Form.Item>
          </Form>
        </Modal>

      </div>
        
    )
  }
}

export default Category