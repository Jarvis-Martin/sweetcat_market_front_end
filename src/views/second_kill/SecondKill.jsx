import React, { useEffect, useRef, useState } from 'react'
import './SecondKill.css'

import TitleBar from '../../components/title_bar/TitleBar';
import GoodItem from './good_item/GoodItem';
import { useHistory } from 'react-router';
import { changeStatus } from '../../utils/CommonFunction';
import { getScrollInstane } from '../../utils/BetterScroll';
export default function SecondKill() {

  const icon_back = require('../../assets/icon_back.png').default

  const history = useHistory()
  const [cur_tab, setCur_tab] = useState(0)

  const tabs = [
    {
      id: 0,
      text: '12:00 ~ 2:00',
    },
    {
      id: 1,
      text: '2:00 ~ 4:00',
    },
    {
      id: 2,
      text: '4:00 ~ 6:00',
    },
    {
      id: 3,
      text: '6:00 ~ 8:00',
    },
  ]
  const second_kill_ref = useRef()
  useEffect(() => {
    const second_kill_scroller = getScrollInstane(second_kill_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    second_kill_scroller.on('pullingUp', () => {
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
    <div className='second_kill'>
      <div className="title_bar">
        <TitleBar title='秒杀' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      <div className="fake_select_bar" />
      <div className="select_bar">
        {
          tabs.map((tab, idx) => {
            return (
              <div key={idx}
                className={`items ${cur_tab == tab.id ? 'border_bottom' : ''}`}
                onClick={changeStatus(tab.id, setCur_tab)}>
                {tab.text}
              </div>
            )
          })
        }
      </div>
      <div className="content_section" ref={second_kill_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            <div className="item_group">
              <GoodItem />
              <GoodItem />
            </div>
            <div className="item_group">
              <GoodItem />
              <GoodItem />
            </div>
            <div className="item_group">
              <GoodItem />
              <GoodItem />
            </div>
            <div className="item_group">
              <GoodItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
