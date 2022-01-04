import React from 'react'
import './GoodItem.css'

export default function GoodItem() {

  const icon_good = require('../../../assets/avatar.jpg').default

  return (
    <div className='good_item'>
      <img src={ icon_good } alt="" className="good_pic" />
        <div className="good_info">
          <div className="field good_name">海德利纯享乳清蛋白海德利纯享乳清蛋白海德利纯享乳清蛋白</div>
          <div className="field goo_specification">
            白色，时尚上衣
          </div>
          <div className="field good_price">
            <div className="price_section">
              <div className="good_cur_price price">￥155</div>
              <div className="good_old_price price">￥155</div>
            </div>
            <div className="number">X1</div>
          </div>
        </div>
    </div>
  )
}
