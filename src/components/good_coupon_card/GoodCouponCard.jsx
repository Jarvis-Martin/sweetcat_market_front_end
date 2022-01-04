import React from 'react'
import './GoodCouponCard.css'

export default function CouponCard(props) {
  const icon_more = require('../../assets/icon_right_narow.png').default
  const icon_avatar = require('../../assets/avatar.jpg').default

  const pics = [
    icon_avatar,
    icon_avatar,
    icon_avatar,
  ]

  return (
    <div className='coupon_cneter_card'>
      <div className="coupon_card_left">
        <div className="coupon_card_left_top">
          <div className="coupon_card_left_top_good_name">肌肉科技白金支链氨基酸...</div>
          <img className="coupon_card_left_top_icon_more" src={icon_more} />
        </div>
        <div className="coupon_card_left_bottom">
          {
            pics.map((pic, idx) => {
              return (
                <img src={pic} alt="" key={idx} className='coupon_card_left_bottom_good_pic' />
              )
            })
          }
        </div>
      </div>
      <div className="coupon_card_right">
        <span className="coupon_card_right_line1">满200</span>
        <div className="coupon_card_right_line2">减15</div>
        <div className="coupon_card_right_line3" onClick={props.onClickBtn}>{props.btn_text}</div>
      </div>
    </div>
  )
}
