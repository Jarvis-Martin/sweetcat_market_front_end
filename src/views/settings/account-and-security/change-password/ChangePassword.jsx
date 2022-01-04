import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './ChangePassword.css';

import { Input, Result, Button, message } from 'antd';
import TitleBar from '../../../../components/title_bar/TitleBar';
import { changeStatus } from '../../../../utils/CommonFunction';
import RestTemplate from '../../../../network/network';
import { USER_BASEURL, USER_CAPTCHA, VERIFY_CAPTCHA } from '../../../../network/network_constant';
import { GlobalMessageDuration2s } from '../../../../utils/CommonConst';

export default function ChangePassword() {
  const history = useHistory()
  const icon_back = require('../../../../assets/icon_back.png').default
  const [step, setStep] = useState(0)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [new2Password, setNew2Password] = useState('')
  const [vertCode, setVertCode] = useState('')

  const [restClient, setRestClient] = useState(new RestTemplate())
  const [userId, setUserId] = useState("660946505393242112")
  const [phone, setPhone] = useState(history.location.state.phone)

  useEffect(() => {
    getCaptcha(history.location.state.phone)()
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
   * 提交验证码
   * @param {Event}} e e
   */
  const submitVertCode = e => {
    // 发送请求，验证验证码正确与否
    let formData = new FormData()
    formData.append("phone", phone)
    formData.append("captcha", vertCode)
    restClient.post(VERIFY_CAPTCHA, formData).then((result) => {
      if (result.errorCode !== "00000") {
        message.error(result.tip, GlobalMessageDuration2s)
        return
      }
      message.success(result.tip, GlobalMessageDuration2s)
      nextStep(step + 1)()
    }).catch((err) => {
      message.error(err.tip, GlobalMessageDuration2s)
    })
  }

  /**
   * 保存新密码
   * @param {Event}} e e
   */
  const savePassword = (newPassword, new2Password) => {
    return e => {
      if (newPassword !== new2Password) {
        // 2次密码不相同
        message.info('2次密码不相同，请重新输入', GlobalMessageDuration2s)
        return
      }
      // 发送请求，验证验证码正确与否
      let formData = new FormData()
      formData.append("password", newPassword)
      restClient.post(`${USER_BASEURL}/${userId}/password`, formData).then((result) => {
        if (result.errorCode !== "00000") {
          message.error(result.tip, GlobalMessageDuration2s)
          return
        }
        message.success(result.tip, GlobalMessageDuration2s)
        nextStep(step + 1)()
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
  /**
   * 原密码、新密码、确认新密码输入时触发的函数
   * @param {Function} setterFunction 
   * @returns 
   */
  const passwordChange = (setterFunction) => {
    return e => {
      setterFunction(e.target.value)
    }
  }
  /**
   * 验证码输入时触发
   * @param {Event} e 
   */
  const vertCodeChange = e => {
    setVertCode(e.target.value)
  }

  /**
   * 返回到修改使得第一页
   */
  const backFirst = () => {
    nextStep(0)()
  }
  /**
   * 进入下一步
   */
  const nextStep = step => {
    return () => {
      setStep(step)
    }
  }
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='change_password'>
      <div className="title_bar">
        <TitleBar title='修改密码' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />

      {/* 主内容区 */}
      <div className="content_section">
        <div className="content_main">
          {
            step === 1 ? (
              <div className="change_pwd_step1_container">
                {/* <div className="change_pwd_step1_container_top">
                  <div className="change_pwd_change_phone_title">原密码</div>
                  <div className="change_pwd_new_phone_input">
                    <Input placeholder="请输入原密码" bordered={false} allowClear onChange={passwordChange(setOldPassword)} />
                  </div>
                </div> */}
                <div className="change_pwd_step1_container_top">
                  <div className="change_pwd_change_phone_title">新密码</div>
                  <div className="change_pwd_new_phone_input" style={{ 'width': '300px' }}>
                    <Input className="change_pwd_new_phone_input" placeholder="请新密码" autoFocus key='password_new_1' bordered={false} allowClear onChange={passwordChange(setNewPassword)} />
                  </div>
                </div>
                <div className="change_pwd_step1_container_top">
                  <div className="change_pwd_change_phone_title">确认密码</div>
                  <div className="change_pwd_new_phone_input" style={{ 'width': '285px' }}>
                    <Input className="change_pwd_new_phone_input" placeholder="密码" key='password_new_2' bordered={false} allowClear onChange={passwordChange(setNew2Password)} />
                  </div>
                </div>
                <div className="comment_btn_container">
                  <div className="publich_comment_btn" onClick={savePassword(newPassword, new2Password)}>
                    保存
                  </div>
                </div>
              </div>
            ) :
              step === 2 ? (
                <div className='step3_container'>
                  <Result
                    status="success"
                    title="修改密码成功"
                    extra={[
                      <Button type='primary' key="buy" onClick={go2(-1)}>返回</Button>,
                    ]}
                  />
                </div>
              ) : (
                <div className="change_pwd_step2_container">
                  <div className="change_pwd_step2_container_tip">
                    <div className="change_pwd_change_phone_tip_title">已向手机号152******50发送验证码</div>
                  </div>
                  <div className="change_pwd_step2_container_top">
                    <div className="change_pwd_change_phone_title">验证码</div>
                    <div className="change_pwd_new_phone_input">
                      <Input placeholder="请输入短信验证码"
                        bordered={false}
                        allowClear
                        onChange={vertCodeChange} />
                    </div>
                    <div className="send_patcha_btn color_blue">获取短信验证码</div>
                  </div>
                  <div className="comment_btn_container">
                    <div className="publich_comment_btn" onClick={submitVertCode}>
                      提交
                    </div>
                  </div>
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}
