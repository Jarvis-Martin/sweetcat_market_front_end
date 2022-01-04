import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import './RecommendGoodDetail.css';
import PubSub from 'pubsub-js'

import { Rate } from 'antd';
import TitleBar from '../../components/title_bar/TitleBar';
import GoodRecommendTopic from '../../components/good_recommend_panel/GoodRecommend';

import { Event_ShowUserMask } from '../../utils/PubSubEventType';
import { getScrollInstane } from '../../utils/BetterScroll';

export default function RecommendGoodDetail() {

  const icon_back = require('../../assets/icon_back.png').default
  const icon_parting_line = require('../../assets/icon_parting_line.png').default
  const icon_comment_reply = require('../../assets/icon_comment_reply.png').default
  const icon_avatar = require('../../assets/avatar.jpg').default

  const refCommentInput = useRef()
  const [stars, setStars] = useState(4)
  const history = useHistory()
  const recommend_good_detail_ref = useRef()
  useEffect(() => {
    const recommend_good_detail_scroller = getScrollInstane(recommend_good_detail_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    recommend_good_detail_scroller.on('pullingUp', () => {
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
  const good_pics = [
    icon_avatar,
    icon_avatar,
    icon_avatar,
    icon_avatar,
  ]
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )

  const onclickAvatar = () => {
    return e => {
      e.stopPropagation()
      e.preventDefault()
      PubSub.publish(Event_ShowUserMask, {})
    }
  }
  return (
    <div className='commend_good_detail'>
      <div className="title_bar">
        <TitleBar title='推荐商品详情' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />

      {/* 主内容区 */}
      <div className="content_section" ref={recommend_good_detail_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            <div className="comment_detail_user_info">
              <img src={icon_avatar} alt="" className="comment_detail_user_avatar" onClick={onclickAvatar()} />
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
            {/* 精品推荐 */}
            <div className="divition" />
            <img src={icon_parting_line} alt="" className="parting_line" />
            <div className="title">猜你喜欢</div>
            <div>
              <GoodRecommendTopic title='' show_footer='1' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
