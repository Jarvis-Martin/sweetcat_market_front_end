import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import './GoodDetail.css';

import { Carousel, Menu, Radio, Space } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import TitleBar from '../../components/title_bar/TitleBar'
import CommentPanel from '../../components/comment_panel/CommentPanel'
import GoodRecommendTopic from '../../components/good_recommend_panel/GoodRecommend';
import GoodCouponCard from '../../components/good_coupon_card/GoodCouponCard';
import { getData } from '../../network/common_function'

import { useHistory } from 'react-router';
import { getScrollInstane } from '../../utils/BetterScroll';
import { Car_Page_URL, Confirm_Good_Info_Page_URL, PreOrder_Page_URL } from '../../utils/PageUrl';
import { showError } from '../../utils/CommonFunction';
import { GET } from '../../network/request_methods';
import { BASEURL, GOOD_BASEURL, GOOD_Detail_BASEURL } from '../../network/network_constant';

export default function GoodDetail() {
  const icon_avatar = require('../../assets/avatar.jpg').default
  const icon_back = require('../../assets/icon_back.png').default
  const icon_incr = require('../../assets/icon_follow.png').default
  const icon_decr = require('../../assets/icon_decr.png').default
  const icon_parting_line = require('../../assets/icon_parting_line.png').default
  const icon_collect = require('../../assets/icon_collect.png').default
  const icon_cancel = require('../../assets/icon_cancel.png').default
  // 已收藏后，显示的 icon_collected 图标
  const icon_collected = require('../../assets/icon_collected.png').default
  const icon_car_default = require('../../assets/icon_car_default.png').default
  const icon_more_red = require('../../assets/icon_more_red.png').default
  const icon_more = require('../../assets/icon_right_narow.png').default
  const icon_loading = require('../../assets/icon_loading.png').default
  const bgImg = require('../../assets/bg.jpeg').default
  const [isShowMask, setIsShowMask] = useState(false)
  const [isShowConfirm, setIsShowConfirm] = useState(false)

  const history = useHistory()
  const [goodNumber, setGoodNumber] = useState(1)
  const good_detail_ref = useRef()
  const [goodDetail, setGoodDetail] = useState()
  const [postType, setPostType] = useState(0)
  const specifications = [
    {
      id: '0',
      title: '白色青春版',
      price: 888
    },
    {
      id: '1',
      title: '白色青春版',
      price: 888
    },
    {
      id: '2',
      title: '白色青春版',
      price: 888
    },
  ]
  useEffect(() => {
    const good_detail_scroller = getScrollInstane(good_detail_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    good_detail_scroller.on('pullingUp', () => {
      // 给底部商品推荐加载更多数据
      console.log('刷新生怕详情数据');
      good_detail_scroller.finishPullUp()
    })

    getData(GET, `${GOOD_BASEURL}/${history.location.state.good_id}`)
      .then((result) => {
        setGoodDetail(result.data.good_info)
      });
  }, [])
  const bannerStyle = {
    width: '375px',
    height: '375px',
    backgroundColor: '#F5F5F5',
  };
  const loclation_Menu = (
    <Menu>
      <Menu.Item key="0">
        <div>河北省北京市天安门</div>
      </Menu.Item>
      <Menu.Item key="1">
        <div>河北省北京市天安门</div>
      </Menu.Item>
    </Menu>
  );
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setPostType(e.target.value)
  };
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
      history.push(path, params)
    }
  }

  /**
   * 标题栏左侧的返回按钮
   */
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  /**
   * 用户点击 + 、- 时触发的回调
   * @param {Integer} nextStatus 
   * @param {Function} setterFunction 
   * @returns 
   */
  const changeStatus = (nextStatus, setterFunction) => {
    return () => {
      nextStatus = nextStatus <= 0 ? 1 : nextStatus
      setterFunction(nextStatus)
    }
  }
  const onGetCoupon = e => {
    e.stopPropagation()
    setIsShowMask(!isShowMask)
  }
  return (
    <div className='good_detail'>
      <div className="title_bar">
        <TitleBar title='商品详情' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" id='good' />
      <div className="fake_select_bar" />
      <div className="select_bar">
        <div className="items">
          <a href='#good' className='text'>商品</a>
        </div>
        <div className="items">
          <a href='#detail' className='text'>详情</a>
        </div>
        <div className="items">
          <a href='#comment' className='text'>评论</a>
        </div>
        <div className="items">
          <a href='#recommend' className='text'>推荐</a>
        </div>
      </div>
      <div className="content_section" ref={good_detail_ref}>
        <div className="content_section_wrapper">
          {/* 商品展示区 */}
          <div className="good_pics">
            <Carousel autoplay>
              {
                goodDetail ? (
                  goodDetail.picBig.map((goodItem, idx) => {
                    return (
                      <div className='banner_item' key={'carousel' + goodItem.picId}>
                        <img src={goodItem} style={bannerStyle} />
                      </div>
                    )
                  })
                ) : (
                  <div className='carousel_icon_loding_container'>
                    <img src={icon_loading} className={`carousel_icon_loding ${goodDetail ? '' : 'loading_circle'}`} />
                  </div>
                )
              }
            </Carousel>
          </div>
          <div className="good_detail_info">
            <div className="field price">
              <div className="price_number">￥{goodDetail ? goodDetail.currentPrice : ''}</div>
              <div className="sale_number_per_month">月销  {goodDetail ? goodDetail.monthlySales : ''}</div>
            </div>
            <div className="coin_discount_section">
              <div className="coin_discount_section_left">
                <div className="coin_counteract_price">金币可抵{goodDetail ? goodDetail.coinCounteractNumber : ''}元</div>
                <div className="has_coupon">商品券满10减少2</div>
              </div>
              <div className="coin_discount_section_right" onClick={onGetCoupon}>
                <div className="coin_discount_section_right_text">领券</div>
                <img src={icon_more_red} alt="" className="coin_discount_section_icon_more" />
              </div>
            </div>
            <div className="field name">{goodDetail ? goodDetail.goodName : ''}</div>
            <div className="field specification_field">
              <div className="number sub_filed">
                <div className="title_for_selection">规格</div>
                <div className="icon_more_container" onClick={() => setIsShowConfirm(!isShowConfirm)}>
                  <img className="icon_more" src={icon_more} />
                </div>
              </div>
              <div className="number sub_filed">
                <div className="title_for_selection">发货</div>
                <div className="number_operation">
                  {goodDetail ? goodDetail.productionArea : ''}
                </div>
              </div>
            </div>
            <div className="gurantee field">
              <div className="title_for_selection">保障</div>
              <div className="gurantee_text">{goodDetail ? goodDetail.guarantee : ''}</div>
            </div>
          </div>
          {/* <div className="fake_title_bar" id='detail' />
          <div className="fake_select_bar" /> */}
          {/* 商品详情区 */}
          <div className="detail_section">
            {
              goodDetail && goodDetail.goodDtail ? (
                goodDetail.goodDetail.map((pic, idx) => {
                  return (
                    <img key={idx} src={pic} alt="" className="detail_pic" />
                  )
                })
              ) : (
                <div />
              )
            }
          </div>
          {/* 评论区 */}
          <div className="commend_section" id='comment'>
            <CommentPanel />
          </div>
          {/* 精品推荐 */}
          <div className="divition" id='recommend' />
          <img src={icon_parting_line} alt="" className="parting_line" />
          <div className="title">猜你喜欢</div>
          <div className="topic good_detail_recommend">
            <GoodRecommendTopic title='' show_footer='1' />
          </div>
        </div>
      </div>

      <div className="tool_bar">
        <div className="btn_small favorite">
          <img src={icon_collect} alt="" className="icon" />
          <div className="text">收藏</div>
        </div>
        <div className="btn_small car">
          <img src={icon_car_default} alt="" className="icon" />
          <div className="text">购物车</div>
        </div>
        <div className="btn_big add2car"
          onClick={navigate2(Confirm_Good_Info_Page_URL, { targetUrl: Car_Page_URL, goodDetail: goodDetail })}>
          加入购物车
        </div>
        <div className="btn_big buy"
          onClick={navigate2(Confirm_Good_Info_Page_URL, { targetUrl: PreOrder_Page_URL, goodDetail: goodDetail })}>
          立即购买
        </div>
      </div>

      {
        isShowMask ? (
          <div className="good_detail_user_mask">
            <div className="good_detail_user_info_mask_main">
              <div className="good_detail_coupons">
                <GoodCouponCard btn_text='立即领取'
                  onClickBtn={e => {
                    console.log('发送请求，获得该券');
                  }} />
              </div>
              <div className="comment_btn_container">
                <div className="publich_comment_btn" onClick={() => setIsShowMask(!isShowMask)}>
                  关闭
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )
      }
      {
        isShowConfirm ? (
          <div className="confirm_container">
            <div className="content_section">
              <div className="content_main">
                <div className="confirm_good_info_page_good_section">
                  <img src={icon_avatar} alt="" className="good_pic" />
                  <div className="good_right">
                    <div className="confirm_good_info_page_price">￥888</div>
                    <div className="confirm_good_info_page_stock">库存8888件</div>
                    <div className="confirm_good_info_page_specification">白色青春版</div>
                  </div>
                </div>
                <div className="confim_good_info_page_specification_section">
                  {
                    goodDetail ? (
                      Object.keys(goodDetail.specification).map((key, idx) => {
                        return (
                          <div className="specification_icon">
                            <div className="confim_good_info_page_specification_header">
                              {key}
                            </div>
                            <div className="specification_btns">
                              {
                                goodDetail.specification[key].map((item, idx) => {
                                  console.log(item.text);
                                  return (
                                    <div className="confim_good_info_page_specification_field" key={idx}>
                                      {item.text}
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="i"></div>
                    )
                  }
                  <div className="number">
                    <div className="title">数量</div>
                    <div className="number_operation">
                      <img className="decr" src={icon_decr} id='detail' onClick={changeStatus(goodNumber + 1, setGoodNumber)} />
                      <div className="text">{goodNumber}</div>
                      <img className="incr" src={icon_incr} onClick={changeStatus(goodNumber + 1, setGoodNumber)} />
                    </div>
                  </div>

                  <div className="post_type_container">
                    <div className="post_type_title">
                      配送方式<span className='post_type_title_tip color_red'>必填</span>
                    </div>
                    <div className="post_type_body">
                      <Radio.Group onChange={onChange} value={postType}>
                        <Space direction="vertical">
                          <Radio value={1}>外卖</Radio>
                          <Radio value={2}>快递</Radio>
                        </Space>
                      </Radio.Group>
                    </div>
                    <div className="post_type_tip color_mute">
                      外卖方式仅支持同城，少量商品配送。快递方式支持非通常，大量商品配送。
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="confirm_faker_footer"></div>
            <div className="comment_btn_container">
              <div className="coupon_tip">
                <div className="color_mute">当前商品可使用优惠券：满100减20</div>
              </div>
              <div className="confirm_btns_con">
                <div className="publich_comment_btn"
                  style={{ backgroundColor: 'rgba(238, 80, 12, 1)' }}
                  onClick={e => {
                    e.stopPropagation()
                    console.log('add to car')
                    setIsShowConfirm(!isShowConfirm)
                  }}>
                  加入购物车
                </div>
                <div className="publich_comment_btn"
                  onClick={() => {
                    if (postType === 0) {
                      showError('请选择配送方式(必填)', '请根据您选择的商品类型、数量等，选择合适的配送方式，谢谢您的配合。')()
                      return
                    }
                    navigate2(PreOrder_Page_URL, {})()
                  }}
                  style={{ backgroundColor: 'rgba(238, 177, 78, 1)' }}>
                  立即购买
                </div>
              </div>
            </div>
            <img className="confirm_close_btn" src={icon_cancel} onClick={() => setIsShowConfirm(!isShowConfirm)} />
          </div>
        ) : (
          <div />
        )
      }
    </div>
  )
}
