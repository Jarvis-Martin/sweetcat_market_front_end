import React from 'react'
import './GoodItem.css'

export default function GoodItem() {
  
  const icon_avatar = require('../../../assets/avatar.jpg').default
  const icon_star_yellow = require('../../../assets/icon_star_yellow.png').default
  const icon_star_gray = require('../../../assets/icon_star_gray.png').default

  return (
    <div className='recommender_good_item'>
      <div className="good_section">
        <div className="good_pic">
          <img src={ icon_avatar } alt="" className="pic" />
        </div>
        <div className="good_info">
          <div className="good_name">YEAA纯享乳清蛋白粉25磅YEAA纯享乳清蛋白粉25磅</div>
          <div className="good_desc">
            <div className="sale_number">销量:12621</div>
            <div className="good_comment_number">好评:12589</div>
          </div>
          <div className="good_price">￥199</div>
          <div className="good_star">
            <div className="text">推荐指数:</div>
            <img src={ icon_star_yellow } className='star' alt="" />
            <img src={ icon_star_yellow } className='star' alt="" />
            <img src={ icon_star_yellow } className='star' alt="" />
            <img src={ icon_star_yellow } className='star' alt="" />
            <img src={ icon_star_gray } className='star' alt="" />
          </div>
        </div>
      </div>
      <div className="recomment_reason">
        <div className="recomment_reason_title">力荐评语:</div>
        <div className="recomment_reason_content">
          YEAA纯享乳清蛋白粉25磅YEAA纯享乳清蛋白粉25磅
          YEAA纯享乳清蛋白粉25磅YEAA纯享乳清蛋白粉25磅
          YEAA纯享乳清蛋白粉25磅YEAA纯享乳清蛋白粉25磅
          YEAA纯享乳清蛋白粉25磅YEAA纯享乳清蛋白粉25磅
        </div>
      </div>
      <div className="recommend_time">2020/04/30 17:42</div>
    </div>
  )
}
