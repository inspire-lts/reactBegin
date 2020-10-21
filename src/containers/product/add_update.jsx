import React,{Component} from 'react'

import {Button, Card, Form, Input, message, Select} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'

import {reqCategoryList, reqAddProduct, reqProdById, reqUpdateProduct} from '../../api/index'
import PictureWall from './picture_wall'
import RichTextEditor  from './rich_text_editor'
const {Option} = Select

@connect(
  state =>({categoryList: state.categoryList, productList: state.productList}),
  {}
)
class AddUpdate extends Component{

  state = {
    categoryList: [],
    operaType: 'add',
    categoryId: '',
    name: '',
    price: '',
    detail: '',
    imgs: [],
    _id: ''
  }

  getCategoryList = async () => {
    let result = await reqCategoryList()
    const {status, data} = result
    if (status === 0) this.setState({categoryList: data})
  }

  componentDidMount() {
    const {categoryList, productList} = this.props
    const {id} = this.props.match.params
    if (id) {
      this.setState({operaType: 'update'})
      if (productList.length) {  // redux有商品列表
        let result = productList.find(item => item._id === id)
        this.setState({...result})
        this.refs.addForm.setFieldsValue({...result})  //回显
        this.child.setFileList(result.imgs)  // 回显图片
        this.editor.setRichText(result.detail)   // 回显富文本
      }
      else this.getProductList(id)
    }
    if (categoryList.length) this.setState({categoryList})
    else this.getCategoryList()

  }

  getProductList = async(id) => {
    let result = await reqProdById(id)
    const {status, data}= result
    if (status === 0) {
      this.setState({...data})
      this.refs.addForm.setFieldsValue({...data})  //回显
      this.child.setFileList(data.imgs)  // 回显图片
      this.editor.setRichText(data.detail)   // 回显富文本
    }
  }
  sendPictureThis = (ref) => {
    this.child = ref
  }

  sendEditorThis = (ref) => {
    this.editor = ref
  }

  render(){
    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 7 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    
      const onFinish = async values => {
        let imgs = this.child.getImgArr()
        let detail = this.editor.getRichText()
        const {operaType, _id} = this.state
        let result 
        if (operaType === 'add') result = await reqAddProduct({...values, imgs, detail})
        else result = await reqUpdateProduct({...values, imgs, detail, _id})
        const {status, msg} = result
        if (status === 0) {
          message.success('操作商品成功')
          this.props.history.replace('/admin/prod_about/product')
        }
        else message.error(msg)
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    return (
      <div>
        <Card title={<Button onClick={this.props.history.goBack}><ArrowLeftOutlined/> {this.state.operaType === 'add' ? '商品添加' : '商品修改'}</Button>} 
          >
            <Form
            ref="addForm"
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="商品名称"
              name="name"
              rules={[{ required: true, message: '名称不能为空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="商品描述"
              name="desc"
              rules={[{ required: true, message: '请输入描述' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
              label="商品价格"
              name="price" 
              rules={[{required: true, message:'请输入价格'}]}>
              <Input
                type="number"
                placeholder="商品价格"
                addonAfter='元'
                addonBefore="￥"/>
            </Form.Item>
            <Form.Item
              label="商品分类"
              name='categoryId'
              >
              <Select >
                {
                  this.state.categoryList.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="商品图片">
                <PictureWall pictureWall={this.sendPictureThis}/>
            </Form.Item>
            <Form.Item
              label="商品详情"
              labelCol ={{ span: 2 }}
              wrapperCol={{ span: 15 }}>
                <RichTextEditor richEditor={this.sendEditorThis}/>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交 
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default AddUpdate