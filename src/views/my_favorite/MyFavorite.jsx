import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './MyFavorite.css';

import TitleBar from '../../components/title_bar/TitleBar';
import GoodRecommendTopic from '../../components/good_recommend_panel/GoodRecommend';
import { getScrollInstane } from '../../utils/BetterScroll';

export default function MyFavorite() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default


  const my_favorite_ref = useRef()

  useEffect(() => {
    const my_favorite_scroller = getScrollInstane(my_favorite_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    my_favorite_scroller.on('pullingUp', () => {
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

  // 标题栏左侧返回按钮
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )

  return (
    <div className='my_favorite'>
      <div className="title_bar">
        <TitleBar title='我的收藏' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      {/* 主内容区 */}
      <div className="content_section" ref={my_favorite_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            {/* 精品推荐 */}
            <div className="topic">
              <GoodRecommendTopic title='' show_footer='1' allow_del={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
