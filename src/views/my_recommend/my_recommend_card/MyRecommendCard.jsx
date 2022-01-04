import React from 'react'
import { useState } from 'react'
import './MyRecommendCard.css';

import { Rate } from 'antd';

import { showConfirm } from '../../../utils/CommonFunction';

export default function MyRecommendCard(props) {
  const [isShowReason, setisShowReason] = useState(props.isShowReason)
  const [stars, setStars] = useState(4)

  const icon_delete = require('../../../assets/icon_delete.png').default
  const icon_avatar = require('../../../assets/avatar.jpg').default  

  const callback_onOK = () => {
    console.log('delete recommend good OK');
  }
  const callback_onCancel = () => {
    console.log('delete recommend good Cancel');
  }
  return (
    <div className="my_recommend_good_card">
      <div className="my_recommend_good_card_tool_section">
        <div className="time">2020/04/30 17:42</div>
        <div className="delete_btn" 
          onClick={ 
            showConfirm('你确定要删除该推荐商品吗？', 
                        '删除后将无法恢复', 
                        callback_onOK,
                        callback_onCancel) 
          }>
          <img src={ icon_delete } alt="" className='icon_delete'/>
          <div className="text">删除</div>
        </div>
      </div>
      <div className="good_section">
        <div className="good_pic">
          <img src={ icon_avatar } alt="" className="pic" />
        </div>
        <div className="good_info">
          <div className="good_name">YEAA纯享乳清蛋白粉25磅YEAA纯享乳清蛋白粉25磅</div>
          <div className="good_desc">
            <div className="sale_number">销量:12621</div>
            <div className="good_comment_number">好评:12589</div>
          </div>
          <div className="good_price">￥199</div>
          <div className="good_star">
            <div className="text">推荐指数:</div>
            <div className="stars_section">
              <Rate disabled defaultValue={ stars } />
            </div>
          </div>
        </div>
      </div>
      {
        isShowReason ? (
          <div className="recomment_reason">
            <div className="recomment_reason_title">力荐评语:</div>
            <div className="recomment_reason_content">
              YEAA纯享乳清蛋白粉25磅YEAA纯享乳清蛋白粉25磅
              YEAA纯享乳清蛋白粉25磅YEAA纯享乳清蛋白粉25磅
              YEAA纯享乳清蛋白粉25磅YEAA纯享乳清蛋白粉25磅
              YEAA纯享乳清蛋白粉25磅YEAA纯享乳清蛋白粉25磅
            </div>
          </div>
        ) : (
          <div />
        )
      }
    </div>
  )
}
