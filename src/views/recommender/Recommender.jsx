import React, { useEffect, useRef } from 'react'
import './Recommender.css';

import GoodItem from './good_item/GoodItem'
import TitleBar from '../../components/title_bar/TitleBar';
import { useHistory } from 'react-router';
import { getScrollInstane } from '../../utils/BetterScroll';

export default function Recommender() {
  const history = useHistory()
  const icon_avatar = require('../../assets/avatar.jpg').default
  const icon_back = require('../../assets/icon_back.png').default
  const icon_follow = require('../../assets/icon_follow.png').default

  const recommender_profile_ref = useRef()
  useEffect(() => {
    const recommender_profile_scroller = getScrollInstane(recommender_profile_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })
    
    recommender_profile_scroller.on('pullingUp', () => {
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

  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='recommender_profile'>
      <div className="title_bar">
        <TitleBar title='荐赏官' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      <div className="fake_header_bar" />

      <div className="content_section_wrapper_outer" ref={recommender_profile_ref}>
        <div className="content_section_wrapper">
          <div className="user_car">
            <img src={icon_avatar} alt="" className="avatar" />
            <div className="user_info">
              <div className="user_name">ForonForonForonForon</div>
              <div className="user_desc">三界健美大赛冠军</div>
              <div className="fans_number">
                <div className="fasn_number_left">
                  {/* <img src={ icon_fans } alt="" className="icon_fans" /> */}
                  <div className="fans_text">粉丝：9999</div>
                </div>
                <div className="fasn_number_right">
                  <img src={icon_follow} alt="" className="icon_follow" />
                  <div className="text">关注</div>
                </div>
              </div>
            </div>
          </div>
          <div className="content_section">
            <div className="content_main">
              <div className="header">
                <div className="recommend_title">推荐商品 </div>
                <span className='recommend_total_number'></span>(100件)
              </div>
              <GoodItem />
              <GoodItem />
              <GoodItem />
              <GoodItem />
              <GoodItem />
              <GoodItem />
              <GoodItem />
              <GoodItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
