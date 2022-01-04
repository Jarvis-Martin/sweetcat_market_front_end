import React from 'react'
import { useState } from 'react'
import './GoodCard.css';

import { message, Rate } from 'antd';
import { Recommender_Profile_Page_URL } from '../../../utils/PageUrl';
import { useHistory } from 'react-router';

export default function GoodCard(props) {
  const history = useHistory()
  const [isFollowed, setIsFollowed] = useState(true)
  const [isShowReason, setisShowReason] = useState(props.isShowReason)
  const [stars, setStars] = useState(4)

  const icon_follow = require('../../../assets/icon_follow.png').default
  const icon_cancel_follow = require('../../../assets/icon_cancel_follow.png').default
  const icon_avatar = require('../../../assets/avatar.jpg').default  

  // 关注 和 取关时触发的函数
  const follow_notFollow = (nextStatus, setter_function) => {
    return e => {
      e.stopPropagation()
      setter_function(nextStatus)
      isFollowed ? 
      message.success('取关成功', 2):
        message.success('关注成功', 2)
    }
  }
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

    <div className="recommend_good_card">
      <div className="remender_section">
        <div className="avatar_con" onClick={ navigate2(Recommender_Profile_Page_URL, {})}>
          <img src={ icon_avatar } alt="" className="avatar" />
        </div>
        <div className="user_info">
          <div className="user_name">王哲</div>
          <div className="description">三界健美大赛冠军</div>
        </div>
        {
          isFollowed ? (
            <div className="follow_btn has_followed" onClick={ follow_notFollow(!isFollowed, setIsFollowed) }>
              <img src={ icon_cancel_follow } alt="" className="icon_follow" />
              <div className="text">取消关注</div>
            </div>
          ) : (
            <div className="follow_btn not_followed" onClick={ follow_notFollow(!isFollowed, setIsFollowed)  }>
              <img src={ icon_follow } alt="" className="icon_follow" />
              <div className="text">关注</div>
            </div>
          )
        }
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
            <div className="recommend_time">2020/04/30 17:42</div>
          </div>
        ) : (
          <div />
        )
      }
    </div>
  )
}
