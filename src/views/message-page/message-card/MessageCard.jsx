import React, { useState } from 'react'
import './MessageCard.css'

import { Badge } from 'antd';
import { useHistory } from 'react-router';
import { CommentDetail_Page_URL, Good_Detail_2_Comment_Section_Page_URL, Good_Detail_Page_URL } from '../../../utils/PageUrl';

export default function MessageCard() {
  const history = useHistory()
  const avatar = require('../../../assets/avatar.jpg').default
  const icon_right_narow = require('../../../assets/icon_right_narow.png').default
  const [isReaded, setIsReaded] = useState(true)
  /**
   * 页面跳转
   * @param {string} path 目标页面路径
   * @param {object}} params 页面跳转要携带的参数
   * @returns 
   */
   const navigate2 = (path, params) => {
    return e => {
      e.stopPropagation()
      history.push(path, params)
    }
  }
  return (
    <div className='message_card'>
      <div className="message_card_top">
        <div alt="" className="message_card_top_left">
          <img src={avatar} alt="" className="message_card_top_avatar" />
          <div className="message_card_top_name">萌小豪520</div>
        </div>
        <img src={icon_right_narow} alt="" className="message_card_top_right" />
      </div>
      <div className="message_card_bottom">
        <div className="message_card_bottom_information" onClick={ navigate2(CommentDetail_Page_URL, {})}>
          <Badge dot={ isReaded }>
            <div className="message_card_bottom_content">
              您的订单已发货
            </div>
          </Badge>
          <div className="message_card_bottom_time">2020/04/30 17:42</div>
        </div>
        <div className="message_card_bottom_goodInfo" onClick={ navigate2(Good_Detail_Page_URL, {})}>
          <img src={avatar} className="message_card_bottom_goodInfo_pic" />
          <div className="message_card_bottom_goodInfo_right">
            <div className="message_card_bottom_goodInfo_name">华为手机华为手机华为手机华为手机</div>
            <div className="message_card_bottom_goodInfo_lookmore">查看详情&gt;&gt;</div>
          </div>
        </div>
      </div>
    </div>
  )
}
