import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './Comment.css';

import { Rate, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TitleBar from '../../components/title_bar/TitleBar';

export default function Comment() {
  const history = useHistory()
  const avatar = require('../../assets/avatar.jpg').default
  const icon_back = require('../../assets/icon_back.png').default
  const [commentContent, setCommentContent] = useState('')
  const [starNumber, setStarNumber] = useState(5)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [title, setTitle] = useState(history.location.state.title)
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ],)
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  };
  const handleChange = ({ fileList }) => setFileList(fileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const { TextArea } = Input;
  const star_desc = ['??????', '??????', '??????', '??????', '?????????'];
  
  /**
   * ??????????????????
   * @param {int} number 
   */
   const go2 = number => {
    return () => {
      history.go(number)
    }
  }
  /**
   * ????????????????????????????????????
   * @param {Event} e 
   */
  const contentChange = (e) => {
    setCommentContent(e.target.value)
  }
  // ???????????????????????????
  const title_bar_left_icon = (
    <img src={ icon_back } alt="" onClick={ go2(-1) } />
  )
  /**
   * ????????????????????????????????? starNumber ?????????
   * @param {Integer} value ???????????????????????????
   */
  const starNumberChange = (value) => {
    setStarNumber(value)
  }

  /**
   * ???????????????????????????????????????????????????
   * @param {File} file ?????????????????????
   * @returns 
   */
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  return (
    <div className='comment_page'>
      <div className="title_bar">
        <TitleBar title={title} left={ title_bar_left_icon } />
      </div>
      <div className="fake_title_bar" />

      {/* ???????????? */}
      <div className="content_section">
        <div className="content_main">
          <div className="address_card_item">
            <div className="comment_good_section">
              <img src={ avatar } alt="" className="good_pic" />
              <div className="good_specification">
                <div className="good_name">????????????P50pro????????????P50pro????????????P50pro????????????P50pro</div>
                <div className="specification">????????????p50prs????????????p50prs????????????p50prs????????????p50prs</div>
              </div>
            </div>
            <div className="star_section">
              <div className="title_star">????????????</div>
              <div className="stars_selector">
              <span>
                <Rate tooltips={star_desc} onChange={starNumberChange} value={starNumber} />
                {starNumber ? <span className="ant-rate-text">{star_desc[starNumber - 1]}</span> : ''}
              </span>
              </div>
            </div>
            <div className="comment_content_section">
              <TextArea
                defaultValue={ commentContent }
                onChange={ contentChange }
                bordered={ false }
                placeholder="????????????????????????????????????????????????????????????"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              <div className="comment_pic_upload">
                {/* ?????????????????? */}
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {/* ?????????????????????????????? */}
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
            </div>
          </div>
          <div className="comment_btn_container">
            <div className="publich_comment_btn" >
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
