import React from 'react'
import { useState } from 'react'
import './AddressCard.css';

import { Checkbox, message } from 'antd';
import { showConfirm } from '../../../utils/CommonFunction'
import { Add_Address_Page_URL, Edit_Address_Page_URL } from '../../../utils/PageUrl'
import { useHistory } from 'react-router';
import RestTemplate from '../../../network/network';
import { USER_BASEURL } from '../../../network/network_constant';
import { GlobalMessageDuration2s } from '../../../utils/CommonConst';

export default function AddressCard(props) {
  const history = useHistory()
  const icon_modification = require('../../../assets/icon_modification.png').default
  const [isDefaultAddress, setIsDefaultAddress] = useState(props.addressDetail.defaultAddress)
  const [addressDetail, setAddressDetail] = useState(props.addressDetail)
  const [userId, setUserId] = useState("660946505393242112")
  const [restClient, setRestClient] = useState(new RestTemplate())

  function onChange(e) {
    // 当前是否为  默认地址
    props.addressDetail.defaultAddress === 1 ?
      // 默认地址：改为非默认
      restClient.patch(`${USER_BASEURL}/${userId}/address/${addressDetail.addressId}/notdefault`, {})
        .then((result) => {
          setIsDefaultAddress(0)
          if (result.errorCode !== "00000") {
            message.error(result.tip, GlobalMessageDuration2s)
            return
          }
          message.success(result.tip, GlobalMessageDuration2s)
          props.refreshAddressList()
        }).catch((err) => {
          message.error(err.tip, GlobalMessageDuration2s)
        }) :
      // 非默认：改为默认
      restClient.patch(`${USER_BASEURL}/${userId}/address/${addressDetail.addressId}/default`, {})
        .then((result) => {
          setIsDefaultAddress(1)
          if (result.errorCode !== "00000") {
            message.error(result.tip, GlobalMessageDuration2s)
            return
          }
          message.success(result.tip, GlobalMessageDuration2s)
          props.refreshAddressList()
        }).catch((err) => {
          message.error(err.tip, GlobalMessageDuration2s)
        })
  }

  const callback_onOK = () => {
    restClient.delete(`${USER_BASEURL}/${userId}/address/${addressDetail.addressId}`)
      .then((result) => {
        if (result.errorCode !== "00000") {
          message.error(result.tip, GlobalMessageDuration2s)
          return
        }
        message.success(result.tip, GlobalMessageDuration2s)
        // // 删除成功后，调用 父组件callback，刷新地址列表
        props.refreshAddressList()
      }).catch((err) => {
        message.error(err.tip, GlobalMessageDuration2s)
      })
  }
  const callback_onCancel = () => {
    console.log('delete recommend good Cancel');
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
  return (
    <div className='address_card'>
      <div className="address_card_top">
        <div className="address_card_top_left">
          <div className="name_phone_section">
            <div className="receiver_name">{addressDetail ? addressDetail.receiverName : ''}</div>
            <div className="phone_number">{addressDetail ? addressDetail.receiverPhone : ''}</div>
          </div>
          <div className="address">
            {
              props.addressDetail.defaultAddress ? (
                <span className='default_address_tag'>默认</span>
              ) : (
                <div />
              )
            }
            {
              addressDetail ? (
                <div className="full_address_text">
                  {`${addressDetail.provinceName + addressDetail.cityName + addressDetail.areaName + addressDetail.townName + addressDetail.detailAddress}`}
                </div>
              ) : (
                <div className="i"></div>
              )
            }
          </div>
        </div>
        <img src={icon_modification}
          onClick={navigate2(Edit_Address_Page_URL, { addressDetail, title: '修改收货地址' })}
          className='modification_btn' />
      </div>
      <div className="address_card_bottom">
        <div className="address_card_bottom_left">
          <Checkbox key={addressDetail ? addressDetail.addressId : ''} checked={props.addressDetail.defaultAddress === 1 ? true : false} onChange={onChange}>默认地址</Checkbox> </div>
        <div className="address_card_bottom_right"
          onClick={showConfirm('你确定要删除该收货地址吗？',
            '删除后将无法恢复',
            callback_onOK,
            callback_onCancel)
          }>
          删除
        </div>
      </div>
    </div>
  )
}
