import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './AccountAndSecurity.css';

import { changeStatus } from '../../../utils/CommonFunction';

import TitleBar from '../../../components/title_bar/TitleBar';
import { ChangePassword_Page_URL, ChangePhone_Page_URL } from '../../../utils/PageUrl';
import RestTemplate from '../../../network/network';
import { USER_BASE_INFO, USER_CAPTCHA } from '../../../network/network_constant';
import { message } from 'antd';
import { GlobalMessageDuration2s } from '../../../utils/CommonConst';

export default function AccountAndSecurity() {

  const icon_back = require('../../../assets/icon_back.png').default
  const icon_more = require('../../../assets/icon_right_narow.png').default

  const history = useHistory()
  const [restClient, setRestClient] = useState(new RestTemplate())
  const [userId, setUserId] = useState("660946505393242112")
  const [userInfo, setUserInfo] = useState('')

  useEffect(() => {
    restClient.get(`${USER_BASE_INFO}/${userId}`)
      .then((result) => {
        if (result.errorCode !== "00000") {
          message.error(result.tip, GlobalMessageDuration2s)
          return
        }
        setUserInfo(result.data.user_info)
        console.log(result.data.user_info);
      }).catch((err) => {
        message.error(err.tip, GlobalMessageDuration2s)
      })
  }, [])


  /**
 * 获取手机验证码
 * @param {String}} phone 手机号
 * @returns 
 */
  const getCaptcha = (phone) => {
    return e => {
      restClient.get(USER_CAPTCHA, {
        params: {
          phone
        }
      }).then((result) => {
        if (result.errorCode !== "00000") {
          message.error(result.tip, GlobalMessageDuration2s)
          return
        }
        message.success(result.tip, GlobalMessageDuration2s)
      }).catch((err) => {
        message.error(err.tip, GlobalMessageDuration2s)
      })
    }
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
    <div className='account_and_security_page'>
      <div className="title_bar">
        <TitleBar title='账号与安全' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />

      {/* 主内容区 */}
      <div className="content_section">
        <div className="content_main">
          <div className="account_and_security_page_field">
            <div className="account_and_security_page_left">
              <div className="account_and_security_page_title">账号</div>
              <div className="default_value">{userInfo ? userInfo.userId : ''}</div>
            </div>
          </div>
          <div className="account_and_security_page_field" onClick={navigate2(ChangePhone_Page_URL, {})}>
            <div className="account_and_security_page_left">
              <div className="account_and_security_page_title">手机号</div>
              <div className="default_value">{userInfo ? userInfo.phone : ''}</div>
            </div>
            <img className="account_and_security_page_icon_more" src={icon_more} />
          </div>
          <div className="account_and_security_page_field" onClick={navigate2(ChangePassword_Page_URL, {'phone': userInfo.phone})}>
            <div className="account_and_security_page_left">
              <div className="account_and_security_page_title">修改登录密码</div>
              <div className="default_value"></div>
            </div>
            <img className="account_and_security_page_icon_more" src={icon_more} />
          </div>
        </div>
      </div>
    </div>
  )
}
