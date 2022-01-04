import React, { useEffect, useRef } from 'react'
import './Profile.css'
import { useHistory } from 'react-router';

import {
  Fans_Follow_Page_URL,
  My_Recommend_Page_URL,
  MyAddress_Page_URL,
  MyFavorite_Page_URL,
  MyCoupon_Page_URL,
  FeedBack_Page_URL,
  Settings_Page_URL,
  Edit_Info_Page_URL,
  My_Message_Page_URL,
  MyFootprint_Page_URL,
  Coupon_Center_Page_URL,
  CoinCenter_Page_URL
} from '../../utils/PageUrl';

import { Badge } from 'antd';

import Tabbar from '../../components/tabbar/Tabbar';
import ProfileTopic from '../../components/profile_topic/ProfileTopic'
import GoodRecommendTopic from '../../components/good_recommend_panel/GoodRecommend'
import { getScrollInstane } from '../../utils/BetterScroll';

export default function Profile() {
  const history = useHistory()

  const profile_ref = useRef()
  useEffect(() => {
    const profile_scroller = getScrollInstane(profile_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })
    /**
     * 右侧商品区，上拉加载更多
     */
    profile_scroller.on('pullingUp', () => {
      profile_scroller.finishPullUp()
    })
  })
  const icon_avatar = require('../../assets/avatar.jpg').default
  const icon_parting_line = require('../../assets/icon_parting_line.png').default
  const icon_notification = require('../../assets/icon_notification.png').default
  const icon_coupon = require('../../assets/icon_coupon.png').default
  const icon_address = require('../../assets/icon_address.png').default
  const icon_heart = require('../../assets/icon_heart.png').default
  const icon_favorite = require('../../assets/icon_favorite.png').default
  const icon_recommend = require('../../assets/icon_recommend.png').default
  const icon_fans = require('../../assets/icon_fans.png').default
  const icon_feedback = require('../../assets/icon_feedback.png').default
  const icon_footprint = require('../../assets/icon_footprint.png').default
  const icon_settings = require('../../assets/icon_settings.png').default
  const icon_coin = require('../../assets/icon_coin.png').default
  const icon_coupon_center = require('../../assets/icon_coupon_center.png').default

  const myOtherServiceItems = [
    {
      icon: icon_coupon,
      target_url: MyCoupon_Page_URL,
      title: '优惠券'
    },
    {
      icon: icon_footprint,
      target_url: MyFootprint_Page_URL,
      title: '足迹'
    },
    {
      icon: icon_address,
      target_url: MyAddress_Page_URL,
      title: '收货地址'
    },
    {
      icon: icon_favorite,
      target_url: MyFavorite_Page_URL,
      title: '我的收藏'
    },
    {
      icon: icon_recommend,
      target_url: My_Recommend_Page_URL,
      title: '我的推荐'
    },
    // {
    //   icon: icon_fans,
    //   target_url: MyFans_Page_URL,
    //   title: '我的粉丝'
    // },
    {
      icon: icon_heart,
      target_url: Fans_Follow_Page_URL,
      title: '粉丝关注'
    },
    {
      icon: icon_feedback,
      target_url: FeedBack_Page_URL,
      title: '问题反馈'
    },
    {
      icon: icon_settings,
      target_url: Settings_Page_URL,
      title: '设置'
    },
  ]

  /**
   * 页面跳转
   * @param {string} path 目标页面路径
   * @param {object}} params 页面跳转要携带的参数
   * @returns 
   */
  const navigate2 = (path, params) => {
    return e => {
      e.stopPropagation()
      e.preventDefault()
      history.push(path, params)
    }
  }

  return (
    <div className='profile' ref={profile_ref}>
      <div className="home_scroll_wrapper">
        <div className="fake_header_bar" />
        <div className="user_car" onClick={navigate2(Edit_Info_Page_URL, {})}>
          <img src={icon_avatar} alt="" className="avatar" />
          <div className="user_info">
            <div className="user_name">Foron</div>
            <div className="user_level">普通用户</div>
          </div>
          <div className="icon_notification_container">
            <Badge dot size='small'>
              <img src={icon_notification} className="icon_notification"
                onClick={navigate2(My_Message_Page_URL, {})} />
            </Badge>
          </div>
        </div>
        <div className="content_section">
          <div className="content_main">
            <div className="topic">
              <ProfileTopic title='我的订单' />
            </div>
            <div className="other_service topic">
              <div className='other_service_topic'>
                <div className="topic_header">
                  <div className="title">其他服务</div>
                </div>
                <div className="topic_content">
                  {
                    myOtherServiceItems.map((item, idx) => {
                      return (
                        <div className="container" key={idx} onClick={navigate2(item.target_url, {})}>
                          <img src={item.icon} alt="" className="icon_pic" />
                          <div className="other_service_title">{item.title}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            <div className="individual_service topic"  onClick={navigate2(CoinCenter_Page_URL, {})}>
              <div className="individual_item  individual_item_left">
                <img className="individual_item_icon" style={{marginRight: '10px'}} src={icon_coin} />
                <div className="individual_item_text">金币中心</div>
              </div>
              <div className="individual_item individual_item_right" onClick={navigate2(Coupon_Center_Page_URL, {})}>
                <div className="individual_item_text" style={{marginRight: '10px'}}>领券中心</div>
                <img className="individual_item_icon" src={icon_coupon_center} />
              </div>
            </div>

            <div className="divition" />
            {/* 精品推荐 */}
            <img src={icon_parting_line} alt="" className="parting_line" />
            <div className="title">猜你喜欢</div>
            <div className="topic">
              <GoodRecommendTopic title='' show_footer='1' />
            </div>
          </div>
        </div>
      </div>
      <div className="tabbar_container">
        <Tabbar />
      </div>
    </div>
  )
}
