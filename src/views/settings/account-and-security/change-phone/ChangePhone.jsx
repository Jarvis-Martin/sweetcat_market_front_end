import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './ChangePhone.css';

import { Input, Result, Button, message } from 'antd';
import TitleBar from '../../../../components/title_bar/TitleBar';
import { changeStatus } from '../../../../utils/CommonFunction';
import RestTemplate from '../../../../network/network';
import { GlobalMessageDuration2s } from '../../../../utils/CommonConst';
import { USER_BASEURL, USER_BASE_INFO, USER_CAPTCHA, VERIFY_CAPTCHA } from '../../../../network/network_constant';

export default function ChangePhone() {
  const history = useHistory()
  const icon_back = require('../../../../assets/icon_back.png').default
  const [step, setStep] = useState(0)
  const [newPhone, setNewPhone] = useState('')
  const [vertCode, setVertCode] = useState('')
  const [restClient, setRestClient] = useState(new RestTemplate())
  const [userId, setUserId] = useState("660946505393242112")
  const [userInfo, setUserInfo] = useState('')

  /**
   * 前往指定页面
   * @param {int} number 
   */
  const go2 = number => {
    return () => {
      history.go(number)
    }
  }

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

  const phoneInputChange = e => {
    setNewPhone(e.target.value)
  }

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
        nextStep(step + 1)()
        message.success(result.tip, GlobalMessageDuration2s)
      }).catch((err) => {
        message.error(err.tip, GlobalMessageDuration2s)
      })
    }
  }

  const vertCodeChange = e => {
    setVertCode(e.target.value)
  }

  /**
   * 提交验证码
   * @param {Event}} e e
   */
  const submitVertCode = e => {
    // 发送请求，验证验证码正确与否
    let formData = new FormData()
    formData.append("phone", newPhone)
    formData.append("captcha", vertCode)
    restClient.post(VERIFY_CAPTCHA, formData).then((result) => {
      if (result.errorCode !== "00000") {
        message.error(result.tip, GlobalMessageDuration2s)
        return
      }
      // 如果验证成功，再请求修改手机号
      formData = new FormData()
      formData.append("phone", newPhone)
      restClient.post(`${USER_BASEURL}/${userId}/phone`, formData).then((result) => {
        if (result.errorCode !== "00000") {
          message.error(result.tip, GlobalMessageDuration2s)
          return
        }
        nextStep(step + 1)()
        message.success(result.tip, GlobalMessageDuration2s)
      }).catch((err) => {
        message.error(err.tip, GlobalMessageDuration2s)
      })
    }).catch((err) => {
      message.error(err.tip, GlobalMessageDuration2s)
    })
  }
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
    <div className='change_phone'>
      <div className="title_bar">
        <TitleBar title='手机号' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />

      {/* 主内容区 */}
      <div className="content_section">
        <div className="content_main">
          {
            step === 1 ? (
              <div className="step1_container">
                <div className="step1_container_top">
                  <div className="change_phone_title">新手机号</div>
                  <div className="new_phone_input">
                    <Input placeholder="请输入新手机号"
                      autoFocus
                      maxLenght={11}
                      bordered={false}
                      allowClear
                      key="input_phone"
                      onChange={phoneInputChange} />
                  </div>
                </div>
                <div className="comment_btn_container">
                  <div className="publich_comment_btn" onClick={getCaptcha(newPhone)}>
                    下一步
                  </div>
                </div>
              </div>
            ) :
              step === 2 ? (
                <div className="step2_container">
                  <div className="step1_container_top">
                    <div className="change_phone_title">手机验证码</div>
                    <div className="new_phone_input">
                      <Input placeholder="请输入手机验证码"
                        key="input_captcha"
                        maxLength={11}
                        bordered={false}
                        allowClear
                        autoFocus
                        onChange={vertCodeChange} />
                    </div>
                  </div>
                  <div className="comment_btn_container">
                    <div className="publich_comment_btn" onClick={submitVertCode}>
                      提交
                    </div>
                  </div>
                </div>
              ) :
                step === 3 ? (
                  <div className='step3_container'>
                    <Result
                      status="success"
                      title="修改绑定手机号成功"
                      extra={[
                        <Button type='primary' key="buy" onClick={backFirst}>返回</Button>,
                      ]}
                    />
                  </div>
                ) : (
                  <div className="step0_container">
                    <div className="change_phone_title">
                      当前绑定的手机号
                    </div>
                    <div className="change_phone_content" style={{ 'margin-top': '20px' }}>
                      {userInfo ? `${userInfo.phone.slice(0, 3)}*****${userInfo.phone.slice(8)}` : ''}
                    </div>
                    <div className="comment_btn_container" style={{ 'margin-top': '40px' }}>
                      <div className="publich_comment_btn" onClick={changeStatus(1, setStep)} >
                        修改手机号
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
