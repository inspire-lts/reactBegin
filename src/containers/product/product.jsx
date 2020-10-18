import React,{Component} from 'react'

import {Card,Button, Select, Input, Table, message} from 'antd'
import {PlusOutlined, SearchOutlined} from '@ant-design/icons'

import {reqPruductList, reqUpdateProdStatus, reqSearchProduct} from '../../api/index'
import {PANGE_SIZE} from '../../config/config'
const {Option} = Select
export default class Product extends Component{

  state = {
    productList: [],
    total: 0,  //一共有几页
    current: 1, //当前在哪页
    keyWord: '', //搜索关键词
    searchType: 'productName', //搜索类型
  }

  getProductList = async (number=1) => {
    let result
    if (this.isSearch) {
      const {searchType, keyWord} = this.state
      result = await reqSearchProduct(number, PANGE_SIZE, searchType, keyWord)
    }else  result = await reqPruductList(number, PANGE_SIZE)
    const {status, data} = result
    if (status === 0) {
      this.setState({
        productList: data.list,
        total: data.total,
        current: number
      })
    }
  }

  updateProdStatus = async({_id, status}) =>{
    
    let productList = [...this.state.productList]
    if(status === 1) status = 2
    else status = 1
    let result = await reqUpdateProdStatus(_id, status)
    if (result.status === 0) {
      message.success('更新状态成功')
      productList = productList.map(item => {
        if (item._id === _id) item.status = status
        return item
      })
      this.setState({productList})
    }
    else message.error('更新状态失败')
  }

  search = async() => {
    this.isSearch = true
    this.getProductList()
    
  }

  componentDidMount() {
    this.getProductList()
  }
  render(){
    const dataSource = this.state.productList
    
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        width: '15%',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: '5%',
        render: price => '$' + price
      },
      {
        title: '状态',
        key: 'status',
        align: 'center',
        width: '10%',
        render: item => {
          return (
            <div>
              <Button 
              type={item.status === 1 ? 'danger': 'primary'}
              onClick={() => this.updateProdStatus(item)}>
                {item.status === 1 ? '下架': '上架'}</Button><br/>
              <span>{item.status===1 ? '在售': '已停售'}</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'opera',
        key: 'opera',
        align: 'center',
        width: '10%',
        render: () => {
          return (
            <div>
              <Button type='link'>详情</Button><br/>
              <Button type='link'>修改</Button>
            </div>
          )
        }
      },
    ];
    
    return (
      <div>
            <Card 
            title= {
              <>
              <Select defaultValue='productName'
                onChange={(value) => this.setState({searchType:value})}>
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
              </Select>
              <Input style={{margin: '0px 10px', width: '20%'}}
                placeholder='请输入搜索关键字'
                allowClear
                onChange={(event)=> this.setState({keyWord: event.target.value})}/>
              <Button type='primary' onClick={this.search}><SearchOutlined />搜索</Button>
              </>
            }
            extra={<Button type="primary" onClick={() =>{this.props.history.push('/admin/prod_about/product/addUpdate')}}><PlusOutlined />添加商品</Button>}>
            <Table 
            dataSource={dataSource}
             columns={columns} 
             bordered
             rowKey='_id'
             pagination={{
               pageSize: PANGE_SIZE,
               total: this.state.total,
               current: this.state.current,
               onChange: this.getProductList
             }}/>
            </Card>
      </div>
    )
  }
}