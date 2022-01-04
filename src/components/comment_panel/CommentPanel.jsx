import React from 'react'
import { useHistory } from 'react-router';
import { All_Comment_Page_URL } from '../../utils/PageUrl';
import './CommentPanel.css'

import CommentItem from './comment_item/CommentItem';

export default function CommentPanel(props) {
  const history = useHistory()
  const icon_vertical_stripe = require('../../assets/icon_vertical_stripe.png').default
  const icon_more = require('../../assets/icon_right_narow.png').default
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
  return (
    <div className="comment_panel">
      <div className="header">
        <div className="left">
          <img src={ icon_vertical_stripe} className="icon_vertical_stripe" />
          <div className="title">评论</div>
          <div className="comment_count">2万+</div>
        </div>
        <div className="right" onClick={ navigate2(All_Comment_Page_URL, {})} >
          <div className="text">查看全部</div>
          <img src={ icon_more } className="icon_more"/>
        </div>
      </div>
      {/* 商品详情页 只显示3条评论 */}
      <div className="content">
        <div className="content_item">
          <CommentItem show_all={ props.show_all} />
        </div>
        <div className="content_item" show_all={ props.show_all} >
          <CommentItem />
        </div>
        <div className="content_item" show_all={ props.show_all} >
          <CommentItem />
        </div>
      </div>
    </div>
  )
}
