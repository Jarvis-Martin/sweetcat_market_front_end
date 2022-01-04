import React from 'react'
import './CoinHistoryCard.css'

export default function CoinHistoryCard() {
  const icon_coin = require('../../../assets/icon_coin.png').default
  return (
    <div className='coin_history_card'>
      <div className="coin_history_card_left">
        <img className="coin_history_card_icon" src={icon_coin} />
        <div className="coin_history_card_center">
          <div className="card_center_top">
            <div className="card_center_top_tag">获得</div>
            <div className="card_center_top_detail">签到获得</div>
          </div>
          <div className="card_center_bottom">2020/04/30 17:42</div>
        </div>
      </div>
      <div className="coin_history_card_right">
        +260
      </div>
    </div>
  )
}
