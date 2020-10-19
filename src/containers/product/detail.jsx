import React,{Component} from 'react'

import {Card, Button, List} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import { connect } from 'react-redux'

import  {reqProdById, reqCategoryList} from '../../api/index'
import './detail.less'


const {Item} = List
@connect(
  state => ({productList: state.productList,
              categoryList: state.categoryList})
)
class Detail extends Component{

  state = {
    categoryId: '',
    desc: '',
    detail: '',
    imgs:[],
    name: '',
    price: '',
    categoryName: '',
    isLoading: true,
  }

  componentDidMount() {
    
    const reduxProdList = this.props.productList
    const reduxCateList = this.props.categoryList
    const {id} = this.props.match.params
    if (reduxProdList.length !== 0) {
      let result = reduxProdList.find(item => item._id === id)
      if (result) {
        this.categoryId = result.categoryId
        this.setState({...result})
      }
    }else this.getProdId(id)
    if(reduxCateList.length){
      console.log(this.state.categoryId)
      let result = reduxCateList.find(item => item._id === this.categoryId)
      this.setState({categoryName: result.name, isLoading: false})
    }else this.getCategoryList()
  
   
  }

  getProdId = async(id) => {

    let result = await reqProdById(id)
    const {status, data} = result
    if (status === 0) {
      this.categoryId = data.categoryId
      this.setState({...data})

    }
  }

  getCategoryList = async() => {
    let result = await reqCategoryList()
    const {status, data} = result
    if (status === 0) {
      let result = data.find(item => item._id === this.categoryId)
      if (result) this.setState({categoryName: result.name, isLoading: false})
    }
  }
  render(){
    return (
      <div>
            <Card title={<Button onClick={this.props.history.goBack}><ArrowLeftOutlined/></Button>} loading= {this.state.isLoading} >
              <List>
                <Item>
                  <span className='prod'>商品名称：</span>
                  {this.state.name}
                </Item>
                <Item>
                  <span className='prod'>商品描述：</span>
                  {this.state.desc}
                </Item>
                <Item>
                  <span className='prod'>商品价格：</span> {this.state.price}
                  
                </Item>
                <Item>
                  <span className='prod'>所属分类：</span> {this.state.categoryName}
                </Item>
                <Item>
                  <span className='prod'>商品图片：</span> { this.state.imgs.map((item, index) => <img key={index} src={`/upload/` + item} alt='商品图片'></img>)}
                </Item>
                <Item>
                  <span className='prod'>商品详情：</span> <span dangerouslySetInnerHTML={{__html: this.state.detail}}></span>
                </Item>
              </List>
            </Card>
      </div>
    )
  }
}

export default Detail