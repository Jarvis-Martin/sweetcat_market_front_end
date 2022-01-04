import React from 'react'
import { useState } from 'react'
import './AddAddress.css';
import { useHistory } from 'react-router';
import { Input, message, Switch } from 'antd';

import TitleBar from '../../components/title_bar/TitleBar';
import { changeStatus } from '../../utils/CommonFunction';
import * as moment from 'moment';
import { USER_BASEURL } from '../../network/network_constant';
import RestTemplate from '../../network/network';
import { GlobalMessageDuration2s } from '../../utils/CommonConst';
import { Edit_Address_Page_URL } from '../../utils/PageUrl';

export default function AddAddress() {
  const history = useHistory()
  // 地址的详细信息对象
  const [address, setaddress] = useState(history.location.state.addressDetail)
  const [restClient, setRestClient] = useState(new RestTemplate())
  const icon_back = require('../../assets/icon_back.png').default
  const icon_more = require('../../assets/icon_right_narow.png').default
  const { province, city, area, town } = require('province-city-china/data');
  const title = history.location.state.title
  const [receiverName, setReceiverName] = useState(address ? address.receiverName : '')
  const [phoneNumber, setPhoneNumber] = useState(address ? address.receiverPhone : '')
  const [userId, setUserId] = useState("660946505393242112")

  console.log(province);

  const [userProvince, setUserProvince] = useState({
    name: address ? address.provinceName : ''
  })
  const [userCity, setUserCity] = useState({
    name: address ? address.cityName : ''
  })
  const [userArea, setUserArea] = useState({
    name: address ? address.areaName : ''
  })
  const [userTown, setUserTown] = useState({
    name: address ? address.townName : ''
  })
  const userSelectedAddress = () => {
    const pro = userProvince.name != '' && userProvince.name != '#' ? userProvince.name : ''
    const city = userCity.name != '' && userCity.name != '#' ? ' · ' + userCity.name : ''
    const area = userArea.name != '' && userArea.name != '#' ? ' · ' + userArea.name : ''
    const town = userTown.name != '' && userTown.name != '#' ? ' · ' + userTown.name : ''
    return pro + city + area + town
  }
  const [addressDetail, setAddressDetail] = useState(address ? address.detailAddress : '')
  const [isDefaultAddress, setIsDefaultAddress] = useState(address ? address.defaultAddress : false)
  const [isShowAddressMask, setIsShowAddressMask] = useState(false)
  const [data, setData] = useState(province)

  const field = [
    {
      idx: 0,
      title: '收货人',
      placeholder: '收货人',
      'setterFunction': setReceiverName,
      value: receiverName
    },
    {
      idx: 1,
      title: '手机号',
      placeholder: '手机号',
      'setterFunction': setPhoneNumber,
      value: phoneNumber
    },
  ]

  /**
   * 保存地址时，发生网络请求的地址
   */
  const params = {
    receiverName,
    phoneNumber,
  }
  /**
   * 设置默认地址 开关的回调
   * @param {boolean} checked 
   */
  function onSwitchChange(checked) {
    setIsDefaultAddress(checked)
  }
  /**
 * 用户输入时，获取输入值
 * @param {event} e 
 */
  const onSelectValue = (setterFunction) => {
    return (e) => {
      setterFunction(e.target.value)
    }
  }

  /**
   * 保存地址，发生网络请求
   * @param {Object} params 待提交的参数的对象
   * @returns 
   */
  const saveAddress = (receiverName, phoneNumber, userProvince, userCity, userArea, userTown, addressDetail, isDefaultAddress) => {
    return e => {
      let formData = new FormData()
      formData.append("receiverName", receiverName)
      formData.append("receiverPhone", phoneNumber)
      formData.append("provinceName", userProvince.code)
      formData.append("cityName", userCity.code)
      formData.append("areaName", userArea.code)
      formData.append("townName", userTown.code)
      formData.append("detailAddress", addressDetail)
      formData.append("defaultAddress", isDefaultAddress ? 1 : 0)

      // 根据 history.location.pathname 判断是 添加地址操作？ 修改地址操作
      let apiUrl = ''
      if (history.location.pathname === Edit_Address_Page_URL) {
        apiUrl = `/user/${userId}/address/${addressDetail.addressId}/edit`
        formData.append("updateTime", moment().valueOf())

      } else {
        apiUrl = `${USER_BASEURL}/${userId}/address/add`;
        formData.append("createTime", moment().valueOf())
      }


      restClient.post(apiUrl, formData)
        .then((result) => {
          if (result.errorCode !== "00000") {
            message.error(result.tip, GlobalMessageDuration2s)
            return
          }
          message.success(result.tip, GlobalMessageDuration2s)
          history.goBack()
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

  const fitValue = (item, setterFunction) => {
    return e => {
      e.stopPropagation()
      setterFunction(item)
    }
  }

  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='add_address'>
      <div className="title_bar">
        <TitleBar title={title} left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      {/* 主内容区 */}
      <div className="content_section">
        <div className="content_main">
          {
            field.map((item, idx) => {
              return (
                <div className="address_field" key={idx}>
                  <div className="title">{item.title}</div>
                  <div className="address_item">
                    <Input placeholder={item.placeholder}
                      bordered={false}
                      allowClear
                      value={item.value}
                      autoFocus={item.idx == 0 ? true : false}
                      onChange={onSelectValue(item.setterFunction)} />
                  </div>
                </div>
              )
            })
          }
          <div className="address_field">
            <div className="title">收货地址</div>
            <div className="address_item">
              <Input placeholder='省、市...'
                bordered={false}
                allowClear
                // 拼接出用户选择的 完整地址
                value={
                  userSelectedAddress()
                }
                onClick={changeStatus(!isShowAddressMask, setIsShowAddressMask)}
                onChange={() => {
                  setUserProvince({ name: '' })
                  setUserCity({ name: '' })
                  setUserArea({ name: '' })
                  setUserTown({ name: '' })
                  changeStatus(!isShowAddressMask, setIsShowAddressMask)()
                }
                } />
            </div>
          </div>
          <div className="address_field">
            <div className="title">详细地址</div>
            <div className="address_item">
              <Input placeholder='小区、乡村...'
                bordered={false}
                allowClear
                value={addressDetail}
                onChange={onSelectValue(setAddressDetail)} />
            </div>
          </div>
          <div className="set_defalute_address">
            <div className="title">设为默认地址</div>
            <div className="address_item">
              <Switch defaultChecked={isDefaultAddress} onChange={onSwitchChange} />
            </div>
          </div>
          <div className="save_address_btn" onClick={saveAddress(receiverName, phoneNumber, userProvince, userCity, userArea, userTown, addressDetail, isDefaultAddress)}>
            保存
          </div>
        </div>
      </div>
      {
        isShowAddressMask ? (
          <div className="address_mask" onClick={changeStatus(!isShowAddressMask, setIsShowAddressMask)}>
            <div className="address_mask_container">
              <div className="address_option header">选择所在地址</div>
              {
                // 显示已选择的 省份
                userProvince.name === '' || userProvince.name == '#' ? (<div />) : (
                  <div className="address_option"
                    onClick={e => {
                      e.stopPropagation()
                      setData(province)
                    }}>
                    {userProvince.name}
                    <img src={icon_more} alt="" className="address_icon_more" />
                  </div>
                )
              }
              {
                // 显示已选择的 市
                userCity.name === '' || userCity.name == '#' ? (<div />) : (
                  <div className="address_option"
                    onClick={e => {
                      e.stopPropagation()
                      changeStatus(city.filter((cty) => {
                        return cty.province === userProvince.province
                      }), setData)()
                    }}>
                    {userCity.name}
                    <img src={icon_more} alt="" className="address_icon_more" />
                  </div>
                )
              }
              {
                // 显示已选择的 区 / 县
                userArea.name === '' || userArea.name == '#' ? (<div />) : (
                  <div className="address_option"
                    onClick={e => {
                      e.stopPropagation()
                      changeStatus(area.filter((are) => {
                        return are.province === userProvince.province
                      }), setData)()
                    }}>
                    {userArea.name}
                    <img src={icon_more} alt="" className="address_icon_more" />
                  </div>
                )
              }
              {
                // 显示已选择的 街道
                userTown.name === '' || userTown.name == '#' ? (<div />) : (
                  <div className="address_option"
                    onClick={e => {
                      e.stopPropagation()
                      changeStatus(town.filter((tow) => {
                        return tow.province === userProvince.province
                      }), setData)()
                    }}>
                    {userTown.name}
                    <img src={icon_more} alt="" className="address_icon_more" />
                  </div>
                )
              }
              <div className="selection_section">
                {/* 省份选择 */}
                {
                  userProvince.name === '' ? (
                    <div className="selection_container">
                      <div className="title">选择省 / 地区</div>
                      {
                        data.map((pro, idx) => {
                          return (
                            <div className={`address_select_item ${userProvince.name === pro.name ? 'color_main_blue' : ''}`}
                              onClick={
                                e => {
                                  e.stopPropagation()
                                  // fitValue 填充用户选择的 省份 信息
                                  fitValue(pro, setUserProvince)(e)
                                  // 获得变量 data 下一个要显示的值（市）
                                  let newData = city.filter((cty) => {
                                    return cty.province === pro.province
                                  })
                                  // 如果 newData.lenght 为 0，说明用户选择的是直辖市，
                                  // 直辖市下是没有 市的
                                  // 所有，如果 newData 为 undefined 时，setData() 设置为 区
                                  if (newData.length <= 0) fitValue({ name: '#' }, setUserCity)(e)
                                  newData = newData.length > 0 ? newData : (
                                    area.filter((are) => {
                                      // 如果没有市，则填充 userCity = '#' 以便后期判断
                                      return are.province === pro.province
                                    })
                                  )
                                  setData(newData)
                                }
                              }
                              ley={idx}>
                              {pro.name}
                            </div>
                          )
                        })
                      }
                    </div>
                  ) : (
                    <div />
                  )
                }
                {/* 市 选择 */}
                {
                  userProvince.name != '' && userCity.name === '' ? (
                    <div className="selection_container">
                      <div className="title">选择所在市</div>
                      {
                        data.map((city, idx) => {
                          return (
                            <div className={`address_select_item ${userCity.name === city.name ? 'color_main_blue' : ''}`}
                              onClick={
                                e => {
                                  e.stopPropagation()
                                  fitValue(city, setUserCity)(e)
                                  let newData = area.filter((are) => {
                                    return are.province === userProvince.province
                                  })
                                  // 如果 newData 为 undefined，说明用户选择的是直辖市，
                                  // 直辖市下是没有 市的
                                  // 所有，如果 newData 为 undefined 时，setData() 设置为 区
                                  if (newData.length <= 0) fitValue({ name: '#' }, setUserArea)(e)
                                  newData = newData.length > 0 ? newData : (
                                    town.filter((tow) => {
                                      return tow.province === userProvince.province
                                    })
                                  )
                                  setData(newData)
                                }
                              }
                              ley={idx}>
                              {city.name}
                            </div>
                          )
                        })
                      }
                    </div>
                  ) : (
                    <div />
                  )
                }
                {/* 区 / 县 选择 */}
                {
                  userProvince.name != '' && userCity.name != '' && userArea.name === '' ? (
                    <div className="selection_container">
                      <div className="title">选择所在区 / 县</div>
                      {
                        data.map((are, idx) => {
                          return (
                            <div className={`address_select_item ${userArea.name === are.name ? 'color_main_blue' : ''}`}
                              onClick={
                                e => {
                                  e.stopPropagation()
                                  fitValue(are, setUserArea)(e)
                                  let newData = town.filter((tow) => {
                                    return tow.province === userProvince.province
                                  })
                                  // 如果 newData 为空，即没有区，则说明地址选择结束，收起地址选择面板
                                  if (newData.length <= 0) fitValue({ name: '#' }, setUserTown)(e)
                                  newData = newData.length > 0 ? newData : (
                                    changeStatus(!isShowAddressMask, setIsShowAddressMask)()
                                  )
                                  setData(newData)
                                }
                              }
                              ley={idx}>
                              {are.name}
                            </div>
                          )
                        })
                      }
                    </div>
                  ) : (
                    <div />
                  )
                }

                {/* 街道 选择 */}
                {
                  userProvince.name != '' && userCity.name != '' && userArea.name != '' && userTown.name === '' ? (
                    <div className="selection_container">
                      <div className="title">选择所在街道</div>
                      {
                        data.map((tow, idx) => {
                          return (
                            <div className={`address_select_item ${userTown.name === tow.name ? 'color_main_blue' : ''}`}
                              onClick={
                                e => {
                                  e.stopPropagation()
                                  fitValue(tow, setUserTown)(e)
                                  setData(province)
                                  changeStatus(!isShowAddressMask, setIsShowAddressMask)()
                                }
                              }
                              ley={idx}>
                              {tow.name}
                            </div>
                          )
                        })
                      }
                    </div>
                  ) : (
                    <div />
                  )
                }
              </div>
            </div>
          </div>
        ) : (
          <div />
        )
      }
    </div>
  )
}
