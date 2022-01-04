import React from 'react'
import './PreOrderGoodCard.css';
import { useState } from 'react'

import { Input } from 'antd';

export default function PreOrderGoodCard() {
  const { TextArea } = Input;
  
  const [goodNumber, setGoodNumber] = useState(1)
  const [orderRemark, setOrderRemark] = useState('')

  const icon_incr = require('../../../assets/icon_follow.png').default
  const icon_decr = require('../../../assets/icon_decr.png').default
  const icon_right_narow = require('../../../assets/icon_right_narow.png').default

  const avatar = require('../../../assets/avatar.jpg').default

  const changeStatus = (nextStatus, setterFunction) => {
    return () => {
      nextStatus = nextStatus <= 0 ? 1 : nextStatus
      setterFunction(nextStatus)
    }
  }
  const onOrderRemarkChange = e => {
      setOrderRemark(e.target.value)
  }

  return (
    <div className="pre_order_good_card">
      <div className="good_section">
        <div className="good_left">
          <img className="pre_order_good_pic" src={ avatar } />
          <div className="good_detail_info">
            <div className="pre_order_good_name">华为手机华为手机华为手机华为手机华为手机华为手机华为手机</div>
            <div className="pre_order_good_specification">白色青春班</div>
          </div>
        </div>
        <div src="" alt="" className="good_price_number">
          <div className="pre_order_total_price">￥1999</div>
          <div className="pre_order_total_number">X{ goodNumber }</div>
        </div>
      </div>
    <div className="good_total_number pre_order_good_card_field">
      <div className="pre_order_good_card_field_title">购买数量</div>
      <div className="number">
        <img className="decr_btn" src={ icon_decr } onClick={ changeStatus(goodNumber-1, setGoodNumber)} />
        <div className="text">{ goodNumber }</div>
        <img className="incr_btn" src={ icon_incr } onClick={ changeStatus(goodNumber+1, setGoodNumber)} />
      </div>
    </div>
    <div className="pre_order_good_card_field">
      <div className="pre_order_good_card_field_title">快递费用</div>
      <img className="pre_order_good_card_field_more" src={ icon_right_narow} />
    </div>
    <div className="pre_order_good_card_field">
      <div className="pre_order_good_card_field_title">订单备注</div>
      <div className="pre_order_remark">
        <TextArea
            value={orderRemark}
            onChange={ onOrderRemarkChange }
            placeholder="请输入顶点备注"
            bordered={ false }
            autoSize={{ minRows: 1, maxRows: 5 }}
          />
      </div>
    </div>
    <div className="pre_order_good_card_field pre_order_item_summary">
      <span className="pre_order_item_summary_number">共1件</span>
      小计：
      <span className="pre_order_item_summary_total_numberr">1999元</span>
    </div>

  </div>
  )
}
