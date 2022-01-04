import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './FeedBack.css';
import * as moment from 'moment';

import { getScrollInstane } from '../../utils/BetterScroll';
import { Rate, Input, Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TitleBar from '../../components/title_bar/TitleBar';
import { GlobalMessageDuration1s, GlobalMessageDuration2s } from '../../utils/CommonConst';
import RestTemplate from '../../network/network';
import { Content } from 'antd/lib/layout/layout';
import { FEEDBACK_UPLOAD_BASEURL, FILEUPLOAD_BASEURL } from '../../network/network_constant';

export default function FeedBack() {
  const avatar = require('../../assets/avatar.jpg').default
  const icon_back = require('../../assets/icon_back.png').default
  const [commentContent, setCommentContent] = useState('')
  const [starNumber, setStarNumber] = useState(5)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [userId, setUserId] = useState("660946505393242112")
  const [restClient, setRestClient] = useState(new RestTemplate())
  // 包含以上传文件
  const [selectedFiles, setSelectedFiles] = useState([])
  const [fileList, setFileList] = useState([])

  const feedback_ref = useRef()
  useEffect(() => {
    const feedback_scroller = getScrollInstane(feedback_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    feedback_scroller.on('pullingUp', () => {
      // 给底部商品推荐加载更多数据
    })
  })
  const saveFeedback = (userId, content, selectedFiles) => {
    return e => {
      let formData = new FormData()
      formData.append("userId", userId)
      formData.append("content", content)
      formData.append('feedbackPics', selectedFiles)
      formData.append("feedbackTime", moment().valueOf())
      restClient.post(FEEDBACK_UPLOAD_BASEURL, formData)
        .then((result) => {
          if (result.errorCode !== "00000") {
            message.error(result.tip, GlobalMessageDuration2s)
            return
          }
          message.success(result.tip, GlobalMessageDuration1s)
          go2(-1)()
        }).catch((err) => {
          message.error(err.tip, GlobalMessageDuration2s)
        })
    }
  }

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  };

  const handleChange = (selectedFiles) => {
    return (data) => {
      let {file, fileList} = data
      if (file.response) {
        let uploadedFileName = new Set()
        fileList.map((file, idx) => {
          uploadedFileName.add(file.response.url)
        })
        uploadedFileName.forEach(fileName => {
          setSelectedFiles([fileName, ...selectedFiles])
        })
      }
      setFileList(fileList)
    }
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const history = useHistory()

  const { TextArea } = Input;

  /**
   * 前往指定页面
   * @param {int} number 
   */
  const go2 = number => {
    return () => {
      history.go(number)
    }
  }
  /**
   * 输入评论内容时触发的回调
   * @param {Event} e 
   */
  const contentChange = (e) => {
    setCommentContent(e.target.value)
  }
  // 标题栏左侧返回按钮
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )

  /**
   * 用户选中文件后，用于活动文件的函数
   * @param {File} file 用户上传的文件
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
    <div className='feed_bakc_page'>
      <div className="title_bar">
        <TitleBar title='发表评价' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />

      {/* 主内容区 */}
      <div className="content_section" ref={feedback_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            <div className="comment_content_section">
              <TextArea
                defaultValue={commentContent}
                onChange={contentChange}
                bordered={false}
                placeholder="请输入您对本应用的使用体验或建议吧~"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              <div className="comment_pic_upload">
                {/* 文件上传按钮 */}
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  action={FILEUPLOAD_BASEURL}
                  onPreview={handlePreview}
                  onChange={handleChange(selectedFiles)}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {/* 用于预览时的图片展示 */}
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
        </div>
      </div>
      <div className="comment_btn_container">
        <div className="publich_comment_btn" onClick={saveFeedback(userId, commentContent, selectedFiles)}>
          保存
        </div>
      </div>
    </div>
  )
}
