import React, { useState } from 'react'
import { useHistory } from 'react-router'
import './CouponCard.css'
import {
  Category_Page_URL
} from '../../../utils/PageUrl';

export default function CouponCard() {
  const history = useHistory()
  const icon_coupon_outdated = require('../../../assets/icon_coupon_outdated.png').default
  const icon_coupon_used = require('../../../assets/icon_coupon_used.png').default
  const [couponStatus, setCouponStatus] = useState('0')
  /**
   * 页面跳转
   * @param {string} path 目标页面路径
   * @param {object}} params 页面跳转要携带的参数
   * @returns 
   */
  const navigate2 = (path, params, isReplace) => {
    return e => {
      e.stopPropagation()
      isReplace ?
        history.replace(path, params) :
        history.push(path, params)
    }
  }
  return (
    <div className='coupon_card'>
      <div className="coupon_card_left">
        <div className="coupon_card_price">
          <div className="money_icon">￥</div>
          <div className="real_price">123</div>
        </div>
        <div className="coupon_card_type"
          style={{ backgroundColor: couponStatus !== '0' ? 'rgba(51, 51, 51, .6)' : 'rgba(27, 164, 240, .6)' }}>通用券</div>
      </div>
      <div className="coupon_card_center">
        <div className="coupon_card_require">满1000可用</div>
        <div className="coupon_card_deadline">有效期至2020/04/30 17:42</div>
      </div>
      {
        couponStatus === '1' ? (
          <div className="coupon_card_tag_container">
            <img src={icon_coupon_used} className='coupon_card_tag' alt="" srcset="" />

          </div>
        ) : (
          couponStatus == '2' ? (
            <div className="coupon_card_tag_container">
              <img src={icon_coupon_outdated} className='coupon_card_tag' alt="" srcset="" />

            </div>
          ) : (
            <div className="coupon_card_right"
              style={{ backgroundColor: couponStatus !== '0' ? 'rgba(51, 51, 51, .6)' : 'rgba(238, 80, 12, 1)' }} onClick={navigate2(Category_Page_URL, {}, true)}>
              去使用
            </div>)
        )
      }
    </div>
  )
}
