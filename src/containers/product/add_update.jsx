import React,{Component} from 'react'

import {Button, Card, Form, Input, Select} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'

import {reqCategoryList} from '../../api/index'
const {Option} = Select

@connect(
  state =>({categoryList: state.categoryList}),
  {}
)
class AddUpdate extends Component{

  state = {
    categoryList: []
  }

  getCategoryList = async () => {
    let result = await reqCategoryList()
    const {status, data} = result
    if (status === 0) this.setState({categoryList: data})
  }

  componentDidMount() {
    const {categoryList} = this.props
    if (categoryList.length) this.setState({categoryList})
    else this.getCategoryList()

  }

  render(){
    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 7 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    
      const onFinish = values => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    return (
      <div>
        <Card title={<Button onClick={this.props.history.goBack}><ArrowLeftOutlined/></Button>} >
            <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
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
              name='category'
              >
              <Select defaultValue="categoryId">
                <Option value='category'>请选择分类</Option>
                {
                  this.state.categoryList.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="商品图片"
              name="picture">
                <Input/>
            </Form.Item>
            <Form.Item
              label="商品详情"
              name="detail">
                <Input/>
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