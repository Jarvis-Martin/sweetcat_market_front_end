import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './EditInfo.css';

import { Upload, DatePicker, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import * as moment from 'moment';
import TitleBar from '../../components/title_bar/TitleBar';
import { changeStatus, getBase64 } from '../../utils/CommonFunction';
import { Edit_Item_Page_URL } from '../../utils/PageUrl';
import { Gender_Female, Gender_Male, GlobalMessageDuration1s, GlobalMessageDuration2s } from '../../utils/CommonConst';
import { BASEURL, FILEUPLOAD_BASEURL, USER_BASEURL, USER_BASE_INFO } from '../../network/network_constant';
import RestTemplate from '../../network/network';

export default function EditInfo() {
  const history = useHistory()

  const icon_back = require('../../assets/icon_back.png').default
  const icon_more = require('../../assets/icon_right_narow.png').default

  const [userId, setUserId] = useState("660946505393242112")
  const [loading, setLoading] = useState(false)
  const [isShowGenderMask, setIsShowGenderMask] = useState(false)
  const [restClient, setRestClient] = useState(new RestTemplate())

  const [userInfo, setUserInfo] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    refreshUserInfo()
  }, [])

  /**
   * 刷新用户基本信息
   */
  const refreshUserInfo = () => {
    restClient.get(`${USER_BASE_INFO}/${userId}`)
      .then((result) => {
        if (result.errorCode !== "00000") {
          message.error(result.tip, GlobalMessageDuration2s)
          return
        }
        setUserInfo(result.data.user_info)
        setImageUrl(result.data.user_info.avatarPath)
      }).catch((err) => {
        message.error(err.tip, GlobalMessageDuration2s)
      })
  }

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
   * 用户上传新头像前对文件大小的检验
   * @param {File} file 
   * @returns 
   */
  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  /**
   * 用户上传新头像时触发的回调
   */
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // done时，发送修改头像的请求
      let formData = new FormData()
      formData.append("userId", userId)
      formData.append("avatar", info.file.response.url)
      restClient.post(`${USER_BASEURL}/${userId}/avatar/upload`, formData)
        .then((result) => {
          if (result.errorCode !== "00000") {
            message.error(result.tip, GlobalMessageDuration2s)
            return
          }
          message.success(result.tip, GlobalMessageDuration2s)
        }).catch((err) => {
          message.error(err.tip, GlobalMessageDuration2s)
        })
        setLoading(false)
        refreshUserInfo()
    }
  }

  /**
   * 标题栏左侧返回按钮
   */
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  /**
   * 文件上传按钮
   */
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  /**
   * 页面跳转
   * @param {string} path 目标页面路径
   * @param {object}} params 页面跳转要携带的参数
   * @returns 
   */
  const navigate2 = (path, params) => {
    return e => {
      history.push(path, params)
    }
  }
  /**
   * 用户点击性别选项时触发的回调
   * @param {Integer} selection 
   * @param {Boolean} nextStatus 
   * @param {Function} setterFunction 
   * @returns 
   */
  const onGenderSelect = (selection, nextStatus, setterFunction) => {
    return e => {
      setterFunction(nextStatus)
      restClient.get(`${USER_BASEURL}/${userId}?gender=${selection}`)
        .then((result) => {
          if (result.errorCode !== "00000") {
            message.error(result.tip, GlobalMessageDuration1s)
            return
          }
          message.success(result.tip, GlobalMessageDuration1s)
          refreshUserInfo()
        }).catch((err) => {
          message.error(err.tip, GlobalMessageDuration1s)
        })
    }
  }
  /**
 * 用户选中生日
 * @param {Moment} moment 
 * @param {String} dateString 
 */
  const onBrithdaySelect = (userSelectMoment, dateString) => {
    restClient.get(`${USER_BASEURL}/${userId}?birthday=${moment(userSelectMoment).valueOf()}`)
      .then((result) => {
        if (result.errorCode !== "00000") {
          message.error(result.tip, GlobalMessageDuration1s)
          return
        }
        message.success(result.tip, GlobalMessageDuration1s)
        refreshUserInfo()
      }).catch((err) => {
        message.error(err.tip, GlobalMessageDuration1s)
      })
  }
  /**
* antd DataPicker 组件禁用的日期
* @param {Moment} current 
* @returns booleans
*/
  const disabledDate = (current) => {
    return current > moment().endOf('day');
  }
  return (
    <div className='edit_info_page'>
      <div className="title_bar">
        <TitleBar title='个人信息' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      {/* 主内容区 */}
      <div className="content_section">
        <div className="content_main">
          {/* 精品推荐 */}
          <div className="edit_info_page_main">
            <div className="edit_info_avatar">
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={FILEUPLOAD_BASEURL}
                beforeUpload={beforeUpload}
                onChange={handleChange}>
                {imageUrl ?
                  <img src={userInfo ? userInfo.avatarPath : ''} alt="avatar" style={{ height: '100%' }} /> :
                  uploadButton}
              </Upload>
            </div>
            <div className="edit_info_useraccount edit_info_field">
              <div className="edit_info_left">
                <div className="edit_info_title">账号</div>
                <div className="default_value">{userInfo ? userInfo.userId : ''}</div>
              </div>
            </div>
            <div className="edit_info_usernickname edit_info_field"
              onClick={navigate2(Edit_Item_Page_URL, {
                title: '编辑昵称',
                key: 'nickName',
                oldValue: userInfo.nickname,
                placeholder: '请输入新的昵称'
              })}>
              <div className="edit_info_left">
                <div className="edit_info_title">昵称</div>
                <div className="default_value">{userInfo ? userInfo.nickname : ''}</div>
              </div>
              <img className="edit_info_icon_more" src={icon_more} />
            </div>
            <div className="edit_info_sex edit_info_field"
              onClick={changeStatus(!isShowGenderMask, setIsShowGenderMask)}>
              <div className="edit_info_left">
                <div className="edit_info_title">性别</div>
                <div className="default_value">{userInfo ? (userInfo.gender === 1 ? '男' : '女') : ''}</div>
              </div>
              <img className="edit_info_icon_more" src={icon_more} />
            </div>
            <div className="edit_info_birth edit_info_field">
              <div className="edit_info_left">
                <div className="edit_info_title">生日</div>
                <div className="birthday_picker_container">
                  <DatePicker placeholder={userInfo ? moment(userInfo.birthday).format("YYYY-MM-DD") : '请选择您的生日'}
                    className='datepicker'
                    bordered={false}
                    inputReadOnly={true}
                    defaultPickerValue={moment()}
                    disabledDate={disabledDate}
                    onChange={onBrithdaySelect} />
                </div>
              </div>
              <img className="edit_info_icon_more" src={icon_more} />
            </div>
            <div className="edit_info_selfdescription edit_info_field"
              onClick={navigate2(Edit_Item_Page_URL, {
                title: '编辑个性签名',
                key: 'personalizedSignature',
                oldValue: userInfo.personalizedSignature,
                placeholder: '请输入新的个性签名'
              })}>
              <div className="edit_info_left">
                <div className="edit_info_title">个性签名</div>
                <div className="default_value">{userInfo ? userInfo.personalizedSignature : ''}</div>
              </div>
              <img className="edit_info_icon_more" src={icon_more} />
            </div>
          </div>
        </div>
      </div>
      {
        isShowGenderMask ? (
          <div className="mask" onClick={changeStatus(!isShowGenderMask, setIsShowGenderMask)}>
            <div className="option_male gender_option" onClick={onGenderSelect(Gender_Male, !isShowGenderMask, setIsShowGenderMask)}>男</div>
            <div className="option_female gender_option" onClick={onGenderSelect(Gender_Female, !isShowGenderMask, setIsShowGenderMask)}>女</div>
            <div className="option_cancel gender_option" onClick={changeStatus(!isShowGenderMask, setIsShowGenderMask)}>取消</div>
          </div>
        ) : (
          <div />
        )
      }
    </div>
  )
}
