import React from 'react'
import { useState } from 'react'
import './CommentItem.css'

import { CommentDetail_Page_URL } from '../../../utils/PageUrl'
import PubSub from 'pubsub-js'

import { Rate } from 'antd';
import { useHistory } from 'react-router';
import { Event_ShowUserMask } from '../../../utils/PubSubEventType'

export default function CommentItem(props) {
  const avatar = require('../../../assets/avatar.jpg').default
  const icon_star_yellow = require('../../../assets/icon_star_yellow.png').default
  const icon_answer = require('../../../assets/icon_answer.png').default
  const [stars, setStars] = useState(4)

  const history = useHistory()
  const pics = [
    avatar,
    avatar,
    avatar,
    avatar,
    avatar,
  ]

  const style = {
    'height': '73px',
    'overflow': 'hidden',
    'textOverflow': '-o-ellipsis-lastline',
    'textOverflow': 'ellipsis',
    'display': '-webkit-box',
    'WebkitLineClamp': '3',
    'lineClamp': '3',
    'WebkitBoxOrient': 'vertical',
  }
  /**
   * 页面跳转
   * @param {string} path 目标页面路径
   * @param {object}} params 页面跳转要携带的参数
   * @returns 
   */
   const navigate2 = (path, params) => {
    return e => {
      history.push(path, params)
    }
  }
  const onclickAvaatar = () => {
    return e => {
      e.stopPropagation()
      e.preventDefault()
      PubSub.publish(Event_ShowUserMask, {})
    }
  }
  return (
    <div className='comment_item' onClick={ navigate2(CommentDetail_Page_URL, {})}>
      <div className="top">
        <div className="left">
          <img className="avatar" src={ avatar } onClick={ onclickAvaatar() }/>
          <div className="user_name">王哲</div>
          <div className="stars">
            <Rate disabled defaultValue={ stars } />
          </div>
        </div>
        <div className="right time">2020/04/30 17:42</div>
      </div>
      <div className="content_text" style={ props.show_all == 1 ? {} : style}>
        朋友 给我推荐的，朋友用着效果不错，
        所以果断买了2瓶😁😁。味道很好闻，
        不刺激，当天就用了，很舒服😊☺，效
        果好用完继续购买。给我推荐的，朋友
        用着效果不错，所以果断买了2瓶😁😁
        。味道很好闻，不刺激，当天就用了，
        很舒服😊☺，效果好用完继续购买。
      </div>
      <div className="content_pics">
        {
          pics.map((pic, idx) => {
            return (
              <img src={ pic } key={ idx } className='comment_pic' alt="" />
            )
          })
        }
      </div>
      <div className="footer">
        <div className="specification">规格：白色时尚上衣</div>
        <div className="text">
          <img src={ icon_answer } alt="" className="icon_answer" />
          回复(2)
        </div>
      </div>
    </div>
  )
}
