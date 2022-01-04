import React from 'react'
import './GoodCard.css'

export default function GoodCard() {
  
  const icon_good = require('../../../assets/avatar.jpg').default
  const icon_add2car = require('../../../assets/icon_add2car.png').default

  const good_gurantee = [
    '正品保证',
    '激素退款'
  ]

  return (
    <div className='search_good_card'>
      <div className="pic_icon_container">
        <img src={ icon_good } alt="" className="pic_icon" />
      </div>
      <div className="good_info">
        <div className="field good_name">海德利纯享乳清蛋白海德利纯享乳清蛋白海德利纯享乳清蛋白...</div>
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
          <img src={ icon_add2car } alt="" className="add2car" />
        </div>
      </div>
    </div>
  )
}
