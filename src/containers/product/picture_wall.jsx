import React, { Component } from 'react'

import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {BASE_URL} from '../../config/config'
import {reqDeletePicture} from '../../api/index'



function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}



export default class PicturesWall extends Component {
    
    state = {
        previewVisible: false,
        previewImage: '',  //预览图片
        previewTitle: '',
        fileList: []
        
    };

    componentDidMount() {
        this.props.pictureWall(this)
    }
    
    // 从fileList中提取所有该商品对应的图片名字，构建一个数组
    getImgArr = () => {
        let result = []
        this.state.fileList.forEach(item => result.push(item.name))
        return result
    }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  // 图片状态改变
  handleChange = async ({file, fileList }) => {
      // 文件上传成功
      if (file.status === 'done'){
          console.log(file.response.data.url)
          fileList[fileList.length - 1].url = file.response.data.url
          fileList[fileList.length - 1].name = file.response.data.name
      }
      // 图片删除
      if (file.status === 'removed') {
          let result = await reqDeletePicture(file.name)
          const {status, msg} = result
          if (status === 0) message.success('删除图片成功')
          else message.error(msg)
      }
      this.setState({ fileList } )
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`} // 接受图片服务器的地址
          method='post'
          name='image'
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}  
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

