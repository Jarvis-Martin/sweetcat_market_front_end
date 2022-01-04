import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './EditOrderAddress.css';

import { changeStatus, showConfirm } from '../../utils/CommonFunction';
import { getScrollInstane } from '../../utils/BetterScroll';

import TitleBar from '../../components/title_bar/TitleBar';
import { Radio, Input, Space } from 'antd';
import AddressCard from './address_card/AddressCard';
import { Add_Address_Page_URL } from '../../utils/PageUrl';

export default function EditOrderAddress() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default

  const title = history.location.state.title
  const new_good_ref = useRef()
  const [addressId, setAddressId] = useState(0)
  useEffect(() => {
    const new_good_scroller = getScrollInstane(new_good_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    new_good_scroller.on('pullingUp', () => {
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

  const onSelectAddress = e => {
    console.log('radio checked', e.target.value);
    setAddressId(e.target.value)
  };

  const submitNewAddress = () => {
    return e => {
      showConfirm("修改成功", '是否返回订单？',
        () => {
          go2(-1)()
        },
        () => {
          return
        }
      )()
    }
  }
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='edit_order_address'>
      <div className="title_bar">
        <TitleBar title='修改收货地址' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />

      {/* 主内容区 */}
      <div className="content_section" ref={new_good_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            {/* 精品推荐 */}
            <div className="edit_order_address_topic">
              <div className="edit_order_address_topic_header">
                当前收货地址
              </div>
              <AddressCard />
            </div>
            <div className="edit_order_address_body">
              <div className="edit_order_address_topic_header_container">
                <div className="edit_order_address_topic_tip">选择新的收货地址</div>
                <div className="add_new_address" onClick={navigate2(Add_Address_Page_URL, {})}>添加新收货地址</div>
              </div>
              <Radio.Group onChange={onSelectAddress} value={addressId}>
                <Radio value={1}>
                  <AddressCard />
                </Radio>
                <Radio value={2}>
                  <AddressCard />
                </Radio>
                <Radio value={3}>
                  <AddressCard />
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
      <div className="comment_btn_container">
        <div className="publich_comment_btn" onClick={submitNewAddress()} >
          提交修改
        </div>
      </div>
    </div>
  )
}
