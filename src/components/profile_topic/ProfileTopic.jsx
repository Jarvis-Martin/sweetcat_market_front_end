import React from 'react'
import './ProfileTopic.css'
import { useHistory } from 'react-router'

import { My_Orders_Page_URL } from '../../utils/PageUrl'
import {  UnPay, UnSend, UnReceive, UnEvalidate } from '../../utils/OrderTab';

import Item from './item/Item'

export default function ProfileTopic(props) {
  const icon_right_narrow = require('../../assets/icon_right_narow.png').default

  const history = useHistory()

  const myOrderItem = [
    {
      target_tab: UnPay,
      icon: require('../../assets/icon_packet.png').default,
      title: '待支付'
    },
    {
      target_tab: UnSend,
      icon: require('../../assets/icon_car.png').default,
      title: '待发货'
    },
    {
      target_tab: UnReceive,
      icon: require('../../assets/icon_box.png').default,
      title: '待收货'
    },
    {
      target_tab: UnEvalidate,
      icon: require('../../assets/icon_book.png').default,
      title: '待评价'
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
      history.push(path, params)
    }
  }
  return (
    <div className='profile_topic'>
      <div className="topic_header">
        <div className="profile_topic_title">{ props.title }</div>
        <div className="more" onClick={ navigate2(My_Orders_Page_URL, {title: '', cur_tab: '0'})}>
          <div className="text">查看全部</div>
          <img className='icon_more' src={ icon_right_narrow } alt="" />
        </div>
      </div>
      <div className="topic_content">
        {
          myOrderItem.map((item, idx) => {
            return (
              <div className="container" key={ idx } onClick={ navigate2(My_Orders_Page_URL, {title: '', cur_tab: item.target_tab}) } >
                <Item icon={ item.icon } title={ item.title }/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
