import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import './CommentDetail.css';
import PubSub from 'pubsub-js'

import { Comment, Tooltip, Avatar, Input, Rate } from 'antd';
import moment from 'moment';

import TitleBar from '../../components/title_bar/TitleBar';
import { Event_ShowUserMask } from '../../utils/PubSubEventType';
import { getScrollInstane } from '../../utils/BetterScroll';

export default function CommentDetail() {

  const icon_back = require('../../assets/icon_back.png').default
  const icon_comment_reply = require('../../assets/icon_comment_reply.png').default
  const icon_avatar = require('../../assets/avatar.jpg').default

  const refCommentInput = useRef()

  const [stars, setStars] = useState(4)
  const history = useHistory()
  const [commentInputTip, setCommentInputTip] = useState('请输入您的评论内容')
  const comment_detail_ref = useRef()
  useEffect(() => {
    const comment_detail_scroller = getScrollInstane(comment_detail_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    comment_detail_scroller.on('pullingUp', () => {
      // 给底部商品推荐加载更多数据
    })
  })
  /**
   * 前往指定页面
   * @param {int} number 
   */
  const go2 = number => {
    return () => {
      history.go(number)
    }
  }
  /**
   * 在用户点击回复某人时，做某些操作，使得用户输入的内容是
   * 评论某人，而不是商品
   * @returns 
   */
  const reply2 = (name) => {
    return () => {
      setCommentInputTip(`回复: ${name}`)
      refCommentInput.current.focus()
    }
  }
  /**
   * 在评论输入框失去焦点时，做某些操作使得，
   * 用户评论的对象变回商品，而不是评论某人
   */
  const onCommentInputBlur = () => {
    setCommentInputTip('请输入您的评论内容')
  }
  const good_pics = [
    icon_avatar,
    icon_avatar,
    icon_avatar,
    icon_avatar,
  ]
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  const actions = [
    <div className="comment_tool_bar">
      <span style={{ textAlign: 'left', marginRight: '210px', fontSize: '15px' }}
        key="comment-basic-reply-to">reply to</span>,
      <span style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '15px' }}
        key="comment-basic-reply-to" onClick={reply2('jack')}>评论</span>,
    </div>
  ];

  const onclickAvaatar = () => {
    return e => {
      e.stopPropagation()
      e.preventDefault()
      PubSub.publish(Event_ShowUserMask, {})
    }
  }
  return (
    <div className='comment_detail'>
      <div className="title_bar">
        <TitleBar title='评论详情' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />

      {/* 主内容区 */}
      <div className="content_section" ref={comment_detail_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            <div className="comment_detail_user_info">
              <img src={icon_avatar} alt="" className="comment_detail_user_avatar" onClick={onclickAvaatar()} />
              <div className="comment_detail_user_name">萌小豪520</div>
            </div>
            <div className="comment_detail_time">2020/04/30 17:42</div>
            <div className="comment_detail_content">
              可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。
              可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。
              可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。
            </div>
            <div className="comment_detail_pics">
              {
                good_pics.map((pic, idx) => {
                  return (
                    <img src={pic} key={idx} className="comment_detail_pic" />
                  )
                })
              }
              <div className="comment_good_specification">
                规格：白色时尚上衣
              </div>
              <div className="comment_good_info">
                <img src={icon_avatar} alt="" className="comment_good_info_pic" />
                <div className="comment_good_right">
                  <div className="comment_good_name">可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。</div>
                  <div className="comment_good_price">￥8888</div>
                </div>
              </div>

              <div className="good_star">
                <div className="text">推荐指数:</div>
                <div className="stars_section">
                  <Rate disabled defaultValue={stars} />
                </div>
              </div>
            </div>
            <div className="comment_detail_all_reply">
              <div className="comment_detail_all_reply_header">
                <img className="comment_detail_all_reply_icon" src={icon_comment_reply} />
                <div className="comment_detail_all_reply_title">全部回复</div>
              </div>
              <div className="comment_detail_all_reply_main">
                <Comment
                  actions={actions}
                  author={<a style={{ fontSize: '13px' }}>萌小豪520</a>}
                  avatar={
                    <Avatar
                      src={icon_avatar}
                    />
                  }
                  content={
                    <p style={{ textAlign: 'left' }}>
                      可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。
                      可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。
                    </p>
                  }
                  datetime={
                    // 评论显示时间的区域
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                      <span>{moment().fromNow()}</span>
                    </Tooltip>
                  }
                >
                  <Comment
                    actions={actions}
                    author={<a style={{ fontSize: '13px' }}>萌小豪520</a>}
                    avatar={
                      <Avatar
                        src={icon_avatar}
                      />
                    }
                    content={
                      <p style={{ textAlign: 'left' }}>
                        可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。
                        可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。

                      </p>
                    }
                    datetime={
                      // 评论显示时间的区域
                      <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                      </Tooltip>
                    }
                  />
                </Comment>
                <Comment
                  actions={actions}
                  author={<a style={{ fontSize: '13px' }}>萌小豪520</a>}
                  avatar={
                    <Avatar
                      src={icon_avatar}
                    />
                  }
                  content={
                    <p style={{ textAlign: 'left' }}>
                      可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。
                      可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。可爱可爱，爱了爱了。

                    </p>
                  }
                  datetime={
                    // 评论显示时间的区域
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                      <span>{moment().fromNow()}</span>
                    </Tooltip>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="comment_btn_container">
        <div className="comment_input">
          <Input placeholder={commentInputTip}
            ref={refCommentInput}
            onBlur={onCommentInputBlur}
            allowClear
            bordered={false} />
        </div>
        <div className="send_reply_btn">发送</div>
      </div>
    </div>
  )
}
