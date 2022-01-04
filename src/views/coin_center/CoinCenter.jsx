import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './CoinCenter.css';
import { Calendar, Select, Radio, Col, Row, Typography } from 'antd';

import TitleBar from '../../components/title_bar/TitleBar';
import GoodRecommendTopic from '../../components/good_recommend_panel/GoodRecommend'
import { useHistory } from 'react-router';
import { getScrollInstane } from '../../utils/BetterScroll';
import { changeStatus } from '../../utils/CommonFunction';
import { Coin_Exchange_Coupon_Page_URL, Coin_History_Page_URL } from '../../utils/PageUrl';

export default function CoinCenter() {

  const icon_back = require('../../assets/icon_back.png').default
  const icon_coin = require('../../assets/icon_coin.png').default
  const icon_signin = require('../../assets/icon_signin.png').default
  const icon_signin_history = require('../../assets/icon_signin_history.png').default
  const icon_coupon_gray = require('../../assets/icon_coupon_gray.png').default
  const icon_cancel = require('../../assets/icon_cancel.png').default
  const [isShowMask, setIsShowMask] = useState(false)
  const [hasSignined, setHasSignined] = useState(false)
  const [ischecked, setIschecked] = useState(true)
  const history = useHistory()

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
  }, [])
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

  const onSigin = e => {
    e.stopPropagation()
    console.log('点击登录');
    setHasSignined(!hasSignined)
  }
  const onShowMask = e => {
    e.stopPropagation()
    console.log(e);
    setIsShowMask(!isShowMask)
  }
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = {
          icon: icon_coin,
          coin_number: 140
        };
        break;
      case 15:
        listData = {
          icon: icon_coin,
          coin_number: 260
        };
        break;
      case 24:
        listData = {
          icon: icon_coin,
          coin_number: 600
        };
      case 30:
        listData = {
          icon: icon_coin,
          coin_number: 1000
        };
        break;
    }
    return listData;
  }
  function mydateCellRender(value) {
    const listData = getListData(value);
    return (
      <div className='calender_item_container'>
        {
          listData ? (
            <div className={`calender_item ${ischecked ? 'checked' : ''}`}>
              <img src={listData.icon} alt="" className='calender_item_pic' />
              <div className="calender_item_text">
                {`X${listData.coin_number}`}
              </div>
            </div>
          ) : (
            <div className="calender_item"></div>
          )
        }
      </div>
    );
  }
  return (
    <div className='coin_center'>
      <div className="title_bar">
        <TitleBar title='金币中心' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      <div className="content_section" ref={my_order_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            <div className="coin_center_header">
              <div className="coin_center_header_left">
                <img className="coin_center_header_icon" src={icon_coin} />
                <div className="coin_center_header_text">9999</div>
              </div>
              <div className="coin_center_header_right">1000币可抵消1元现金喔</div>
            </div>
            <div className="coin_center_operation_btns">
              <div className="coin_center_operation_btn" onClick={onShowMask}>
                <img className="coin_center_operation_btn_icon" src={icon_signin} />
                <div className="coin_center_operation_btn_text">签到</div>
              </div>
              <div className="coin_center_operation_btn" onClick={navigate2(Coin_History_Page_URL, {})}>
                <img className="coin_center_operation_btn_icon" src={icon_signin_history} />
                <div className="coin_center_operation_btn_text">明细</div>
              </div>
              <div className="coin_center_operation_btn" onClick={navigate2(Coin_Exchange_Coupon_Page_URL, {})}>
                <img className="coin_center_operation_btn_icon" src={icon_coupon_gray} />
                <div className="coin_center_operation_btn_text">兑优惠券</div>
              </div>
            </div>
            <div className="coin_goods">
              <GoodRecommendTopic title='' show_footer='1' />
            </div>
          </div>
        </div>
      </div>
      {
        isShowMask ? (
          <div className="coin_center_sigin_mask">
            <div className="coin_center_sigin_mask_main">
              <div className="coin_center_sigin_calender_panel">
                <Calendar
                  dateCellRender={mydateCellRender}
                  fullscreen={false}
                  headerRender={({ value, type, onChange, onTypeChange }) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];

                    const current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    for (let i = 0; i < 12; i++) {
                      current.month(i);
                      months.push(localeData.monthsShort(current));
                    }

                    for (let index = start; index < end; index++) {
                      monthOptions.push(
                        <Select.Option className="month-item" key={`${index}`}>
                          {months[index]}
                        </Select.Option>,
                      );
                    }
                    const month = value.month();
                    const year = value.year();
                    const options = [];
                    for (let i = year - 10; i < year + 10; i += 1) {
                      options.push(
                        <Select.Option key={i} value={i} className="year-item">
                          {i}
                        </Select.Option>,
                      );
                    }
                    return (
                      <div style={{ padding: 8 }}>
                        <Typography.Title level={4}>
                          <div className="signin_title_container">
                            <div className="signin_title">签到</div>
                            <div className="signin_title_cancel_icon_container" onClick={ changeStatus(!isShowMask, setIsShowMask)}>
                              <img className="signin_title_cancel_icon" src={icon_cancel} />
                            </div>
                          </div>
                        </Typography.Title>
                        <Row gutter={8}>
                          <Col>
                            <Select
                              size="small"
                              dropdownMatchSelectWidth={false}
                              className="my-year-select"
                              onChange={newYear => {
                                const now = value.clone().year(newYear);
                                onChange(now);
                              }}
                              value={String(year)}
                            >
                              {options}
                            </Select>
                          </Col>
                          <Col>
                            <Select
                              size="small"
                              dropdownMatchSelectWidth={false}
                              value={String(month)}
                              onChange={selectedMonth => {
                                const newValue = value.clone();
                                newValue.month(parseInt(selectedMonth, 10));
                                onChange(newValue);
                              }}
                            >
                              {monthOptions}
                            </Select>
                          </Col>
                        </Row>
                      </div>
                    );
                  }}
                  onPanelChange={onPanelChange}
                />
              </div>
              <div className="coin_center_sigin_comment_btn_container">
                <div className="coin_center_sigin_publich_comment_tip">已签 25 天</div>
                {
                  hasSignined ? (
                    <div className="coin_center_sigin_publich_comment_btn close" onClick={onShowMask}>关闭</div>
                  ) : (
                    <div className="coin_center_sigin_publich_comment_btn signin" onClick={onSigin}>签到</div>
                  )
                }
              </div>
            </div>
          </div>
        ) : (<div />)
      }
    </div>
  )
}
