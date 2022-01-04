import React, { useEffect, useRef, useState } from 'react'
import './Settings.css';

import { showConfirm } from '../../utils/CommonFunction';
import { MyAddress_Page_URL, FeedBack_Page_URL, Account_And_Security_Page_URL, Login_Page_URL, Edit_Info_Page_URL } from '../../utils/PageUrl'

import TitleBar from '../../components/title_bar/TitleBar';
import { useHistory } from 'react-router';

import { getScrollInstane } from '../../utils/BetterScroll';
import RestTemplate from '../../network/network';
import { GlobalMessageDuration2s } from '../../utils/CommonConst';
import { message } from 'antd';
import { USER_BASE_INFO } from '../../network/network_constant';

export default function Settings() {
  const icon_avatar = require('../../assets/avatar.jpg').default
  const icon_back = require('../../assets/icon_back.png').default
  const icon_right_narow = require('../../assets/icon_right_narow.png').default

  const [userId, setUserId] = useState("660946505393242112")
  const [userInfo, setUserInfo] = useState({})
  const [restClient, setRestClient] = useState(new RestTemplate())

  const history = useHistory()
  const callback_onOK = () => {
    console.log('delete recommend good OK');
  }
  const callback_onCancel = () => {
    console.log('delete recommend good Cancel');
  }
  const settings_ref = useRef()
  useEffect(() => {
    const settings_scroller = getScrollInstane(settings_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    settings_scroller.on('pullingUp', () => {
      // 给底部商品推荐加载更多数据
    })

    restClient.get(`${USER_BASE_INFO}/${userId}`)
    .then((result) => {
      if (result.errorCode !== "00000") {
        message.error(result.tip, GlobalMessageDuration2s)
        return
      }
      setUserInfo(result.data.user_info)
    }).catch((err) => {
      message.error(err.tip, GlobalMessageDuration2s)
    })
  }, [])
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

  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='settings_page'>
      <div className="title_bar">
        <TitleBar title='设置' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />

      <div className="content_section" ref={settings_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            <div className="user_info_section">
              <div className="user_info" onClick={navigate2(Edit_Info_Page_URL, {})}>
                <div className="user_info_left_section">
                  <img src={userInfo ? userInfo.avatarPath : '' } alt="" className="settings_avatar" />
                  <div className="user_info_right_section">
                    <div className="settings_username">{userInfo ? userInfo.nickName : '' }</div>
                    <div className="settings_useraccount">应用账号: 88888888</div>
                  </div>
                </div>
                <img className="more_icon" src={icon_right_narow} />
              </div>
              <div className="settings_field" onClick={navigate2(MyAddress_Page_URL)}>
                <div className="settings_field_title">我的收货地址</div>
                <img className="more_icon" src={icon_right_narow} />
              </div>
            </div>
            <div className="settings_field margin_top" onClick={navigate2(Account_And_Security_Page_URL)}>
              <div className="settings_field_title">账户与安全</div>
              <img className="more_icon" src={icon_right_narow} />
            </div>
            <div className="settings_field margin_top" onClick={navigate2(FeedBack_Page_URL)}>
              <div className="settings_field_title">问题反馈</div>
              <img className="more_icon" src={icon_right_narow} />
            </div>
            <div className="settings_btn" onClick={navigate2(Login_Page_URL, {})}>
              切换账号
            </div>
            <div className="settings_btn" onClick={
              showConfirm('你确定要退出吗？',
                '',
                callback_onOK,
                callback_onCancel)
            }>
              退出登录
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
