import React from 'react'
import { useState } from 'react'
import './Item.css';

import { Badge } from 'antd';

export default function Item(props) {
  const [messageNumber, setMessageNumber] = useState(1)
  
  return (
    <div className='item'>
      <Badge count={ messageNumber } size='small'>
        <img src={ props.icon } alt="" className="icon_pic" />
        <div className="order_topic_title">{ props.title }</div>
      </Badge>
    </div>
  )
}
