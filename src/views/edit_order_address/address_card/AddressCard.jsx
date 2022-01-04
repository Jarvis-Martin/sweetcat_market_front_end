import React from 'react'
import './AddressCard.css';

import { Radio, Input, Space } from 'antd';

export default function AddressCard() {
  return (
    <div className='edit_order_address_card'>
      <div className="edit_order_address_card_top">
        <div className="edit_order_address_card_receiver_name">萌小豪</div>
        <div className="edit_order_address_card_receiver_phone">12345678910</div>
      </div>
      <div className="edit_order_address_card_bottom">河南省 信阳市 浉河区 新二十四大街 信阳职业技术学院</div>
    </div>
  )
}
