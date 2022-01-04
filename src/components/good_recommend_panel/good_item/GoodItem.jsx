import React from 'react'
import './GoodItem.css'

import { message } from 'antd';
import { GlobalMessageDuration2s } from '../../../utils/CommonConst';

export default function GoodItem() {

  const good_pic = require('../../../assets/avatar.jpg').default
  const icon_add2car = require('../../../assets/icon_add2car.png').default

  const add2carr = params => {
    return e => {
      e.stopPropagation()
      message.success('添加购物车成功', GlobalMessageDuration2s)
    }
  }

  return (
    <div className='recommend_good_item'>
      <div className="good_pic">
        <img src={ good_pic } alt="" className="pic" />
      </div>
      <div className="good_name">银白科技蓝牙互联智能体脂称SHY-005银白科技蓝牙互联智能体脂称SHY-005</div>
      <div className="recommend_good_item_good_price">￥199</div>
      <div className="coin_counteract_price">金币可抵1.99元</div>
      <div className="add_car_number">
        <div className="nummber">1321人加购</div>
        <img src={ icon_add2car } alt="" className="add2car" onClick={ add2carr({}) } />
      </div>
    </div>
  )
}
