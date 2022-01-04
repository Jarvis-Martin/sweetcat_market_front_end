import React, { useRef } from 'react'

import { useState } from 'react'
import { useHistory } from 'react-router';
import './LoginPage.css';
import { ChangePassword_Page_URL, Register_Page_URL } from '../../utils/PageUrl';
import { changeStatus } from '../../utils/CommonFunction';
import { Input, message } from 'antd';
import TitleBar from '../../components/title_bar/TitleBar';
import RestTemplate from '../../network/network';
import { USER_LOGIN, USER_LOGIN_CAPTCHA, VERIFY_CAPTCHA } from '../../network/network_constant';
import { GlobalMessageDuration2s } from '../../utils/CommonConst';

export default function LoginPage() {
  // const icon_logo = require('../../assets/icon_logo.svg').default
  const icon_logo = require('../../assets/icon_logo.png').default
  const avatar = require('../../assets/avatar.jpg').default
  const icon_back_gray = require('../../assets/icon_back_gray.png').default
  const history = useHistory()
  const getCaptchaForLoginBtnRef = useRef()
  const [restClient, setRestClient] = useState(new RestTemplate())
  const [loginWithPhone, setLoginWithPhone] = useState(true)
  const [phone, setPhone] = useState()
  const [captcha, setCaptcha] = useState('')
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
  /**
   * 表单项填值后触发
   * @param {Function} setterFunction 
   * @returns 
   */
  const onValueChange = setterFunction => {
    return e => {
      setterFunction(e.target.value)
    }
  }
  /**
   * 表单项填值后触发
   * @param {Function} setterFunction 
   * @returns 
   */
  const onCaptchaChange = setterFunction => {
    return e => {
      setterFunction(e.target.value)
      if (e.target.value.length === 6) {
        let formData = new FormData()
        formData.append("phone", phone)
        formData.append("captcha", e.target.value)
        restClient.post(USER_LOGIN, formData).then((result) => {
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
  }

  /**
   * 获取手机验证码
   * @param {String}} phone 手机号
   * @returns 
   */
  const getCaptcha = (phone) => {
    console.log(phone);
    return e => {
      restClient.get(USER_LOGIN_CAPTCHA, {
        params: {
          phone
        }
      }).then((result) => {
        if (result.errorCode !== "00000") {
          console.log("get captcha error" + result);
          message.error(result.tip, GlobalMessageDuration2s)
          return
        }
        message.success(result.tip, GlobalMessageDuration2s)
      }).catch((err) => {
        message.error(err.tip, GlobalMessageDuration2s)
      })
    }
  }
  const title_bar_left_icon = (
    <img src={icon_back_gray} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='login_page'>
      <div className="title_bar">
        <TitleBar title='登录' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />

      {/* 主内容区 */}
      <div className="content_section">
        <div className="content_main">
          <img src={icon_logo} alt="" className="login_app_logo" />
          {
            loginWithPhone ? (
              // 手机号登录
              <div className="login_form_container">
                <div className="input_container">
                  <Input placeholder="请输入注册的手机号"
                    defaultValue={phone}
                    onChange={onValueChange(setPhone)}
                    key='login_by_phone_input_phone'
                    allowClear bordered={false} />
                </div>
                <div className="input_container">
                  <Input placeholder="请输入验证码"
                    defaultValue={captcha}
                    onChange={onCaptchaChange(setCaptcha)}
                    key='login_by_phone_input_captcha'
                    allowClear bordered={false} />
                </div>
                <div className="comment_btn_container">
                  <div className="publich_comment_btn"
                    ref={getCaptchaForLoginBtnRef}
                    onClick={getCaptcha(phone)}>
                    获得验证码
                  </div>
                </div>
                <div className="other_option">
                  <div className="navigate2register" onClick={navigate2(Register_Page_URL, {})}>用户注册</div>
                  <div className="login_with_account"
                    onClick={changeStatus(!loginWithPhone, setLoginWithPhone)}>账号密码登录</div>
                </div>
              </div>
            ) : (
              // 账号密码登录
              <div className="form_container">
                <div className="input_container">
                  <Input placeholder="请输入账号" allowClear bordered={false} />
                </div>
                <div className="input_container">
                  <Input placeholder="请输入密码" allowClear bordered={false} />
                </div>
                <div className="comment_btn_container">
                  <div className="publich_comment_btn" >
                    登录
                  </div>
                </div>
                <div className="other_option">
                  <div className="navigate2register" onClick={navigate2(Register_Page_URL, {})}>立即注册</div>
                  <div className="reset_password" onClick={navigate2(ChangePassword_Page_URL, {})}>忘记密码</div>
                  <div className="login_with_account"
                    onClick={changeStatus(!loginWithPhone, setLoginWithPhone)}>手机号登录</div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div >
  )
}

