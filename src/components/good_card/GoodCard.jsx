import React from 'react'
import './GoodCard.css'

import { message } from 'antd';
import { GlobalMessageDuration2s } from '../../utils/CommonConst';

export default function GoodCard() {

  const icon_good = require('../../assets/avatar.jpg').default
  const icon_add2car = require('../../assets/icon_add2car.png').default

  const good_gurantee = [
    '正品保证',
    '激素退款'
  ]
  const add2carr = params => {
    return () => {
      message.success('添加购物车成功', GlobalMessageDuration2s)
    }
  }

  return (
    <div className='good_card'>
      <div className="pic_icon_container">
        <img src={ icon_good } alt="" className="pic_icon" />
      </div>
      <div className="good_info">
        <div className="field good_name">海德利纯享乳清蛋白...</div>
        <div className="field good_gurantee">
          {
            good_gurantee.map((gurantee, idx) => {
              return (
                <div className="gurantee" key={ idx }>{ gurantee }</div>
              )
            })
          }
        </div>
        <div className="field good_price">
          <div className="price_section">
            <div className="good_cur_price price">￥155</div>
            <div className="good_old_price price">￥155</div>
          </div>
          <img src={ icon_add2car } alt="" className="add2car"  onClick={ add2carr({}) } />
        </div>
      </div>
    </div>
  )
}
