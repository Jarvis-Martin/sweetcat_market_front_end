import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './CouponCenter.css';

import { changeStatus } from '../../utils/CommonFunction';

import TitleBar from '../../components/title_bar/TitleBar';
import GoodCouponCard from '../../components/good_coupon_card/GoodCouponCard';
import { useHistory } from 'react-router';
import { getScrollInstane } from '../../utils/BetterScroll';

export default function CouponCenter() {

  const icon_back = require('../../assets/icon_back.png').default

  const history = useHistory()
  // 当前 tab 页
  const [cur_tab, setCur_tab] = useState(0)

  const tabs = [
    {
      id: "0",
      text: "商品券"
    },
    {
      id: "1",
      text: '通用券'
    },
  ]
  const my_order_ref = useRef()
  useEffect(() => {
    const my_order_scroller = getScrollInstane(my_order_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    my_order_scroller.on('pullingUp', () => {
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
    <div className='coupon_center'>
      <div className="title_bar">
        <TitleBar title='领券中心' left={title_bar_left_icon} />
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
      <div className="content_section" ref={my_order_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            <div className="order_car_item">
              <GoodCouponCard btn_text='立即领取'
                onClickBtn={e => {
                  e.stopPropagation()
                  console.log('发送请求，获得该券');
                }} />
            </div>
            <div className="order_car_item">
              <GoodCouponCard btn_text='立即领取'
                onClickBtn={e => {
                  e.stopPropagation()
                  console.log('发送请求，获得该券');
                }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
