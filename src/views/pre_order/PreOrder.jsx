import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import './PreOrder.css';

import PreOrderGoodCard from './pre_order_good_card/PreOrderGoodCard';
import TitleBar from '../../components/title_bar/TitleBar';
import GoodRecommendTopic from '../../components/good_recommend_panel/GoodRecommend';
import { OrderDetail_Page_URL } from '../../utils/PageUrl';

import { getScrollInstane } from '../../utils/BetterScroll';
export default function PreOrder() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default
  const icon_address = require('../../assets/icon_address.png').default
  const icon_right_narow = require('../../assets/icon_right_narow.png').default
  const icon_parting_line = require('../../assets/icon_parting_line.png').default

  const pre_order_ref = useRef()
  useEffect(() => {
    const pre_order_scroller = getScrollInstane(pre_order_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    pre_order_scroller.on('pullingUp', () => {
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
  const submitOrder = () => {
    return () => {
      // 进入订单详情页面
      // 未付款：显示付款按钮：未发货前，可修改收货地址
      // 已付款：显示待收货详情
      history.replace(OrderDetail_Page_URL, {})
    }
  }
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='pre_order_page'>
      <div className="title_bar">
        <TitleBar title='确定订单' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      {/* 主内容区 */}
      <div className="content_section" ref={pre_order_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            <div className="pre_order_address topic">
              <div className="pre_order_address_left">
                <img className="pre_order_address_icon" src={icon_address} />
                <div className="pre_order_address_detail">
                  <div className="pre_order_name_phone">
                    <div className="pre_order_username">萌小豪520</div>
                    <div className="pre_order_phone">12345678901</div>
                  </div>
                  <div className="pre_order_full_address">
                    河北省北京市xx区xx街道河北省北京市xx区xx街道
                    河北省北京市xx区xx街道河北省北京市xx区xx街道
                  </div>
                </div>
              </div>
              <img className="pre_order_address_more_icon" src={icon_right_narow} />
            </div>
            <div className="pre_order_main topic">
              <PreOrderGoodCard />
            </div>
            <div className="pre_order_main topic">
              <PreOrderGoodCard />
            </div>
            {/* 精品推荐 */}
            {/* <div className="divition" />
            <img src={icon_parting_line} alt="" className="parting_line" />
            <div className="title">猜你喜欢</div>
            <div className="topic">
              <GoodRecommendTopic title='' show_footer='1' />
            </div> */}
          </div>
        </div>
      </div>

      <div className="total_bar">
        <div className="left_section">
          <div className="total_price">
            <div>合计: </div>
            <div className="price">￥560</div>
          </div>
          <div className="discount_price">已优惠:￥40</div>
        </div>
        <div className="compute_btn" onClick={submitOrder()}>提交订单</div>
      </div>
    </div>
  )
}
