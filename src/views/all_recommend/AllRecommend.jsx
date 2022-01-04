import React, { useEffect, useRef } from 'react'
import './AllRecommend.css';

import { useHistory } from 'react-router';

import { getScrollInstane } from '../../utils/BetterScroll';
import TitleBar from '../../components/title_bar/TitleBar';
import SearchBar from '../../components/search_bar/SearchBar';
import GoodCard from '../../components/recommend_topic/good_card/GoodCard'

export default function AllRecommend() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default

  const all_recommend_ref = useRef()
  useEffect(() => {
    const all_recommend_scroller = getScrollInstane(all_recommend_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    all_recommend_scroller.on('pullingUp', () => {
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
    <div className='all_recommend'>
      <div className="title_bar">
        <TitleBar title='推荐商品' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      <div className="search_section">
        {/* 搜索栏 */}
        <SearchBar />
      </div>
      <div className="content_section" ref={all_recommend_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            <div className="good_card_item">
              <GoodCard isShowReason={true} />
            </div>
            <div className="good_card_item">
              <GoodCard isShowReason={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
