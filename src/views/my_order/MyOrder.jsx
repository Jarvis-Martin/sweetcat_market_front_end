import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './MyOrder.css';

import { changeStatus } from '../../utils/CommonFunction';
import { All_Order, UnPay, UnSend, UnReceive, UnEvalidate } from '../../utils/OrderTab';

import TitleBar from '../../components/title_bar/TitleBar';
import OrderCard from '../../components/order_card/OrderCard';
import { useHistory } from 'react-router';
import { getScrollInstane } from '../../utils/BetterScroll';

export default function MyOrder() {

  const icon_back = require('../../assets/icon_back.png').default

  const history = useHistory()
  // 当前 tab 页
  const [cur_tab, setCur_tab] = useState(history.location.state.cur_tab)

  const tabs = [
    {
      id: All_Order,
      text: '全部'
    },
    {
      id: UnPay,
      text: '待付款'
    },
    {
      id: UnSend,
      text: '待发货'
    },
    {
      id: UnReceive,
      text: '待收货'
    },
    {
      id: UnEvalidate,
      text: '待评价'
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
    <div className='my_order'>
      <div className="title_bar">
        <TitleBar title='我的订单' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      <div className="fake_select_bar" />
      <div className="select_bar">
        {/* 
            0：全部
            1：未付款
            2：待收货
            3：退换货 
        */}
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
              <OrderCard />
            </div>
            <div className="order_car_item">
              <OrderCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
