import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './Register.css';

import * as moment from 'moment';
import { changeStatus } from '../../utils/CommonFunction';
import { Input, DatePicker, Result, Button, message } from 'antd';
import TitleBar from '../../components/title_bar/TitleBar';
import { Gender_Female, Gender_Male, GlobalMessageDuration2s } from '../../utils/CommonConst';
import { Login_Page_URL } from '../../utils/PageUrl';
import RestTemplate from '../../network/network';
import { USER_REGISTER_CAPTCHA, USER_REGISTER, VERIFY_CAPTCHA } from '../../network/network_constant';

export default function Register() {

  const icon_logo = require('../../assets/icon_logo.png').default
  const icon_back_gray = require('../../assets/icon_back_gray.png').default
  const history = useHistory()
  const [step, setStep] = useState(0)
  const [isShowGenderMask, setIsShowGenderMask] = useState(false)
  const [phone, setPhone] = useState('')
  const [vertifyCode, setVertifyCode] = useState('')
  const [nickName, setNickName] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState(0)
  const [birthday, setBirthday] = useState('')
  const [restClient, setRestClient] = useState(new RestTemplate())
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
   * 进入注册步骤的第一个步骤
   * @param {Integer}} stepNumber 
   * @returns 
   */
  const nextStep = stepNumber => {
    return e => {
      setStep(stepNumber)
    }
  }

  /**
   * 页面跳转
   * @param {string} path 目标页面路径
   * @param {object}} params 页面跳转要携带的参数
   * @returns 
   */
  const navigate2 = (path, isReplace, params) => {
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
      console.log('用户选择了性别' + selection);
      setterFunction(nextStatus)
      setGender(selection)
    }
  }
  /**
   * 返回到注册第一步
   */
  const backFirst = () => {
    nextStep(0)()
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
 * 1. 验证手机号输入格式
 * 2. 后端验证是否已注册
 * @param {Event} e 
 */
  const onPhoneInput = e => {
    setPhone(e.target.value)
  }
  /**
   * 用户选中生日
   * @param {Moment} moment 
   * @param {String} dateString 
   */
  const onBrithdaySelect = (mo, dateString) => {
    setBirthday(moment(mo).valueOf())
  }
  /**
   * antd DataPicker 组件禁用的日期
   * @param {Moment} current 
   * @returns booleans
   */
  const disabledDate = (current) => {
    return current > moment().endOf('day');
  }

  /**
   * 获取手机验证码
   * @param {String}} phone 手机号
   * @returns 
   */
  const getCaptcha = (phone) => {
    return e => {
      restClient.get(USER_REGISTER_CAPTCHA, {
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
        nextStep(step + 1)()
      }).catch((err) => {
        message.error(err.tip, GlobalMessageDuration2s)
      })
    }
  }

  /**
   * 验证手机号和验证码正确性
   * @param {String} phone phone 
   * @param {String} captcha captcha 
   * @returns 
   */
  const verifyCaptcha = (phone, captcha) => {
    return e => {
      let formData = new FormData()
      formData.append("phone", phone)
      formData.append("captcha", captcha)
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
  }

  const register = (nickName, password, gender, birthday, phone) => {
    return e => {
      let formData = new FormData()
      formData.append("nickname", nickName)
      formData.append('password', password)
      formData.append('gender', gender)
      formData.append('birthday', birthday)
      formData.append('phone', phone)

      restClient.post(USER_REGISTER, formData).then((result) => {
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
    }
  }

  const title_bar_left_icon = (
    <img src={icon_back_gray} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='login_page'>
      <div className="title_bar">
        <TitleBar title='注册' left={title_bar_left_icon} />
      </div>
      {/* <div className="fake_title_bar" /> */}

      {/* 主内容区 */}
      <div className="content_section">
        <div className="content_main">
          {
            step === 3 ? (
              <div />
            ) : (
              <img src={icon_logo} alt="" className="app_logo" />
            )
          }
          {
            step === 1 ? (
              <div className="form_container">
                <div className="input_container">
                  <Input placeholder="请输入手机号"
                    key="step1_input_phone"
                    allowClear
                    bordered={false}
                    value={phone}
                    disabled />
                </div>
                <div className="input_container">
                  <Input placeholder="请输入验证码"
                    key='step1_input_captcha'
                    allowClear
                    autoFocus
                    bordered={false}
                    defaultValue={vertifyCode}
                    onChange={onCaptchaChange(setVertifyCode)} />
                </div>
                <div className="comment_btn_container">
                  <div className="publich_comment_btn"
                    key="step1_verify_captcha"
                    onClick={verifyCaptcha(phone, vertifyCode)} >
                    下一步
                  </div>
                </div>
                <div className="other_option">
                  <div className="reset_password" onClick={navigate2(Login_Page_URL, false, {})}>已有账号? 前往登录</div>
                </div>
              </div>
            ) :
              step === 2 ? (
                <div className="form_container">
                  <div className="input_container">
                    <Input placeholder="请输入您喜欢的昵称"
                      key="step2_input_nickname"
                      defaultValue={nickName}
                      allowClear
                      bordered={false}
                      onChange={onValueChange(setNickName)} />
                  </div>
                  <div className="input_container">
                    <Input placeholder="请设置您的密码"
                      key="step2_input_password"
                      value={password}
                      type='password'
                      allowClear
                      bordered={false}
                      onChange={onValueChange(setPassword)} />
                  </div>
                  <div className="input_container" onClick={changeStatus(!isShowGenderMask, setIsShowGenderMask)} >
                    <Input placeholder="请选择您的性别"
                      key="step2_input_gender"
                      disabled
                      allowClear
                      value={gender === 0 ? '女' : '男'}
                      bordered={false} />
                  </div>
                  <div className="input_container">
                    <DatePicker placeholder='请选择您的生日'
                      key="step2_input_birthday"
                      className='datepicker'
                      bordered={false}
                      inputReadOnly={true}
                      defaultPickerValue={moment()}
                      disabledDate={disabledDate}
                      onChange={onBrithdaySelect} />
                  </div>
                  <div className="comment_btn_container">
                    <div className="publich_comment_btn"
                      key="tep1_register"
                      onClick={register(nickName, password, gender, birthday, phone)} >
                      注册
                    </div>
                  </div>
                  <div className="other_option">
                    <div className="reset_password" onClick={navigate2(Login_Page_URL, {})}>已有账号? 前往登录</div>
                  </div>
                </div>
              ) :
                step === 3 ? (
                  <div className='step3_container'>
                    <Result
                      status="success"
                      title="注册成功"
                      extra={[
                        // <Button type='primary' key="buy" onClick={backFirst}>返回</Button>,
                        <Button type='primary' key="buy" onClick={navigate2(Login_Page_URL, {})}>前往登录</Button>,
                      ]}
                    />
                  </div>
                ) : (
                  <div className="form_container">
                    <div className="input_container">
                      <Input placeholder="(中国)+86"
                        disabled
                        allowClear
                        bordered={false} />
                    </div>
                    <div className="input_container">
                      <Input placeholder="请输入手机号"
                        key="step0_input_phone"
                        autoFocus
                        allowClear
                        bordered={false}
                        defaultValue={phone}
                        onChange={onPhoneInput} />
                    </div>
                    <div className="comment_btn_container">
                      <div className="publich_comment_btn" key="step0_get_captcha" onClick={getCaptcha(phone)}>
                        下一步
                      </div>
                    </div>
                    <div className="other_option">
                      {/* <div className="navigate2register">用户注册</div> */}
                      <div className="reset_password" onClick={navigate2(Login_Page_URL, {})}>已有账号? 前往登录</div>
                    </div>
                  </div>
                )
          }
        </div>
      </div>
      {
        isShowGenderMask ? (
          <div className="register_gender_mask" onClick={changeStatus(!isShowGenderMask, setIsShowGenderMask)}>
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
