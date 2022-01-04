import React, { useState } from 'react'
import './GoodItem.css'

import { Progress } from 'antd';
import { useHistory } from 'react-router';
import { Confirm_Good_Info_Page_URL, PreOrder_Page_URL } from '../../../utils/PageUrl';

export default function GoodItem() {
  const history = useHistory()
  const [percentage, setPercentage] = useState(10)

  const icon_refresh = require('../../../assets/avatar.jpg').default

  const buyNow = (params) => {
    return e => {
      if (percentage > 0) {
        // percentage > 0 时，正常下单
        history.push(Confirm_Good_Info_Page_URL, params)
      }
      // 否则，已抢光，不做任何处理
    }
  }
  return (
    <div className='second_kill_good_item'>
      <div className="good_pic">
        <img src={ icon_refresh } alt="" className="pic" />
      </div>
      <div className="good_name">银白科技蓝牙互联智能体脂称SHY-005银白科技蓝牙互联智能体脂称SHY-005</div>
      <div className="good_price">￥199</div>
      <div className="process_bar">
        <Progress percent={ percentage }
                  size="small"
                  strokeColor={ percentage >= 70 ? '#52c41a' : percentage >= 30 ? 'orange' : '#ff4d4f'} />
      </div>
      <div className="add_car_number">
        {/* <div className="specification">规格: 白色时尚上衣X1</div> */}
        <div alt="" className="buy" onClick={ buyNow({targetUrl: PreOrder_Page_URL}) }>
          {
            percentage <= 0 ? '已抢光' : '抢购'
          }
        </div>
      </div>
    </div>
  )
}
