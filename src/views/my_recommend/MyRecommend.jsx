import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import './MyRecommend.css'

import TitleBar from '../../components/title_bar/TitleBar';
import MyRecommendCard from './my_recommend_card/MyRecommendCard'
import { getScrollInstane } from '../../utils/BetterScroll';

export default function MyRecommend() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default
  const my_recommend_ref = useRef()
  useEffect(() => {
    const my_recommend_scroller = getScrollInstane(my_recommend_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })
    
    my_recommend_scroller.on('pullingUp', () => {
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
      <img src={ icon_back } alt="" onClick={ go2(-1) } />
    )
  return (
    <div className='my_recommend'>
      <div className="title_bar">
        <TitleBar title='我的推荐' left={ title_bar_left_icon } />
      </div>
      <div className="fake_title_bar" />
      <div className="content_section" ref={ my_recommend_ref }>
        <div className="content_section_wrapper">
          <div className="content_main">
            <div className="person_item">
              <MyRecommendCard isShowReason={ true }/>
            </div>
            <div className="person_item">
              <MyRecommendCard isShowReason={ true }/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
