import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import './OrderDetail.css';

import TitleBar from '../../components/title_bar/TitleBar';
import GoodRecommendTopic from '../../components/good_recommend_panel/GoodRecommend';
import { getScrollInstane } from '../../utils/BetterScroll';
import { Eidt_Order_Address_Page_URL } from '../../utils/PageUrl';
export default function OrderDetail() {

  const avatar = require('../../assets/avatar.jpg').default
  const icon_back = require('../../assets/icon_back.png').default
  const icon_address = require('../../assets/icon_address.png').default
  const icon_right_narow = require('../../assets/icon_right_narow.png').default
  const icon_parting_line = require('../../assets/icon_parting_line.png').default

  const history = useHistory()
  const [goodNumber, setGoodNumber] = useState(1)
  const order_detail_ref = useRef()
  useEffect(() => {
    const order_detail_scroller = getScrollInstane(order_detail_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })
    
    order_detail_scroller.on('scroll', position => {
      // 给底部商品推荐加载更多数据
    })
  })
  const orderInfo = [
    {
      title: '商品总价',
      value: '8888'
    },
    {
      title: '运费',
      value: '20'
    },
    {
      title: '商品券',
      value: '-1.99元'
    },
    {
      title: '通用券',
      value: '-1.99元'
    }
  ]
  const orderIdInfo = [
    {
      title: '订单编号',
      value: '123456789'
    },
    {
      title: '创建时间',
      value: '2020/04/30 17:42'
    },
  ]
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
   * 页面跳转
   * @param {string} path 目标页面路径
   * @param {object}} params 页面跳转要携带的参数
   * @returns 
   */
   const navigate2 = (path, params) => {
    return e => {
      e.stopPropagation()
      history.push(path, params)
    }
  }

  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='order_detail_page'>
      <div className="title_bar">
        <TitleBar title='等待买家付款' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      {/* 主内容区 */}
      <div className="content_section" ref={ order_detail_ref }>
        <div className="content_section_wrapper">
          <div className="content_main">
            <div className="order_address topic">
              <div className="order_address_left">
                <img className="order_address_icon" src={icon_address} />
                <div className="order_address_detail">
                  <div className="order_name_phone">
                    <div className="order_username">萌小豪520</div>
                    <div className="order_phone">12345678901</div>
                  </div>
                  <div className="order_full_address">
                    河北省北京市xx区xx街道河北省北京市xx区xx街道
                    河北省北京市xx区xx街道河北省北京市xx区xx街道
                  </div>
                </div>
              </div>
              {/* <img className="order_address_more_icon" src={ icon_right_narow } /> */}
            </div>
            <div className="order_main topic">
              <div className="good_section">
                <div className="good_left">
                  <img className="order_good_pic" src={avatar} />
                  <div className="good_detail_info">
                    <div className="order_good_name">华为手机华为手机华为手机华为手机华为手机华为手机华为手机</div>
                    <div className="order_good_specification">白色青春班</div>
                  </div>
                </div>
                <div src="" alt="" className="good_price_number">
                  <div className="order_total_price">￥1999</div>
                  <div className="order_total_number">X{goodNumber}</div>
                </div>
              </div>
              {
                orderInfo.map((item, idx) => {
                  return (
                    <div className="order_good_card_field" key={idx + 'good_info'}>
                      <div className="order_good_card_field_title">{item.title}</div>
                      <div className="order_good_card_field_value">{item.value}</div>
                    </div>
                  )
                })
              }
              <div className="order_total_price_field">
                <div className="order_good_card_field_title">实付款：</div>
                <div className="order_total_price">8888</div>
              </div>
            </div>

            <div className="order_info_detail_section topic">
              <div className="order_info_detail_section_header">
                订单信息
              </div>
              {
                orderIdInfo.map((item, idx) => {
                  return (
                    <div className="order_good_card_field" key={idx + 'order_info'}>
                      <div className="order_good_card_field_title">{item.title}</div>
                      <div className="order_good_card_field_value">{item.value}</div>
                    </div>
                  )
                })
              }
            </div>
            {/* 精品推荐 */}
            <div className="divition" />
            <img src={icon_parting_line} alt="" className="parting_line" />
            <div className="title">猜你喜欢</div>
            <div className="topic">
              <GoodRecommendTopic title='' show_footer='1' />
            </div>
          </div>

        </div>
      </div>

      <div className="fake_total_bar" />
      <div className="order_operation">
        <div className="order_operation_btn">取消订单</div>
        <div className="order_operation_btn" onClick={navigate2(Eidt_Order_Address_Page_URL, {})}>修改地址</div>
        <div className="order_operation_btn">付款</div>
      </div>
    </div>
  )
}
