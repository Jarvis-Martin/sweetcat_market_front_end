import React, { useState } from 'react'
import { useHistory } from 'react-router'
import './CouponCard.css'

export default function CouponCard() {
  const history = useHistory()
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
    <div className='good_detail_coupon'>
      <div className="coupon_card_left">
        <div className="coupon_card_price">
          <div className="money_icon">￥</div>
          <div className="real_price">123</div>
        </div>
        <div className="coupon_card_type">商品券</div>
      </div>
      <div className="coupon_card_center">
        <div className="coupon_card_require">满1000可用</div>
        <div className="coupon_card_deadline">有效期至2020/04/30 17:42</div>
      </div>

      <div className="good_detail_coupon_card_right">
        领取
      </div>
    </div>
  )
}
