import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './MyCoupon.css';

import TitleBar from '../../components/title_bar/TitleBar';
import CouponCard from './coupon_card/CouponCard';
import GoodCouponCard from '../../components/good_coupon_card/GoodCouponCard'
import { getScrollInstane } from '../../utils/BetterScroll';

import { LongTouchEventTriggerDuration } from '../../utils/CommonConst';
import { changeStatus, showConfirm } from '../../utils/CommonFunction'
import { Coupon_History_Page_URL, Good_Detail_Page_URL } from '../../utils/PageUrl';

export default function MyCoupon() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default
  const my_coupon_ref = useRef()
  const [isShowMask, setIsShowMask] = useState(false)
  const [touchStartTimeStamp, setTouchStartTimeStamp] = useState()
  const [longTouchTimeot, setLongTouchTimeout] = useState()
  // 当前 tab 页
  const [cur_tab, setCur_tab] = useState(0)

  const tabs = [
    {
      id: 0,
      text: '全部'
    },
    {
      id: 1,
      text: '商品券'
    },
    {
      id: 2,
      text: '通用券'
    }
  ]
  useEffect(() => {
    const my_coupon_scroller = getScrollInstane(my_coupon_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    my_coupon_scroller.on('pullingUp', () => {
      // 给底部商品推荐加载更多数据
    })
  })
  const OK_Callback = () => {
    console.log('用户确认删除该消息');
  }

  const Cancel_Callback = () => {
    console.log('用户确认删除该消息');
  }
  /**
   * 用户点击删除时触发：1.删除该数据；2.关闭 mask
   * @param {any} nextStatus 
   * @param {Function} setterFunction 
   * @returns 
   */
  const onOpeartionDelete = (nextStatus, setterFunction) => {
    return e => {
      showConfirm('您确定要删除该条消息吗？', '删除后将无法恢复',
        OK_Callback,
        Cancel_Callback)()
    }
  }

  /**
   * 用户点击标记为已读时的执行的函数
   * @param {any} nextStatus 
   * @param {Function} setterFunction 
   * @returns 
   */
  const onOpeartionSetReadedOrNot = (nextStatus, setterFunction) => {
    return e => {
      e.stopPropagation()
      setterFunction(nextStatus)
    }
  }
  const onCancel = (nextStatus, setterFunction) => {
    return e => {
      e.stopPropagation()
      setterFunction(nextStatus)
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
   * 用户长按开始时触发的函数
   * @returns 
   */
  const onTouchStart = () => {
    return e => {
      setTouchStartTimeStamp(e.timeStamp)
      let timeOut = setTimeout(() => {
        setIsShowMask(true)
      }, LongTouchEventTriggerDuration);
      setLongTouchTimeout(timeOut)
    }
  }
  /**
   * 用户长按开始结束触发的函数
   * @returns 
   */
  const onTouchEnd = () => {
    return e => {
      // 如果长按时长 >= LongTouchEventTriggerDuration
      // 认为是长按事件，阻止事件冒泡去触发子组件点击事件
      if (e.timeStamp - touchStartTimeStamp >= LongTouchEventTriggerDuration) {
        e.stopPropagation()
      }
      // 否则认为是 点击事件，不阻止事件冒泡（触发子组件的点击事件）
      setTouchStartTimeStamp(0)
      clearTimeout(longTouchTimeot)
    }
  }
  /**
   * 用户移动手指触发的函数
   * @returns 
   */
  const onTouchMove = () => {
    return e => {
      clearTimeout(longTouchTimeot)
    }
  }
  /**
   * 前往指定页面
   * @param {int} number 
   */
  const go2 = number => {
    return () => {
      history.go(number)
    }
  }

  // 标题栏左侧返回按钮
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )

  return (
    <div className='my_coupon'>
      <div className="title_bar">
        <TitleBar title='我的优惠券' left={title_bar_left_icon} />
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
      {/* 主内容区 */}
      <div className="content_section" ref={my_coupon_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            <div className="mycoupon_tool_bar">
              <div className="mycoupon_use_history_btn" onClick={ navigate2(Coupon_History_Page_URL, {})}>历史记录</div>
            </div>
            {/* 精品推荐 */}
            <div className="coupon_topic"
              onTouchStart={onTouchStart()}
              onTouchEnd={onTouchEnd()}
              onTouchMove={onTouchMove()}>
              <CouponCard />
            </div>
            <div className="coupon_topic">
              <CouponCard />
            </div>
            <div className="coupon_topic">
              <GoodCouponCard btn_text='去使用'
                onClickBtn={(e) => {
                  navigate2(Good_Detail_Page_URL, {})()
                }} />
            </div>
          </div>
        </div>
      </div>
      {
        isShowMask ? (
          // <div className="mask_message" onClick={ changeStatus(!isShowMask, setIsShowMask)}>
          <div className="mask_message" onClick={changeStatus(!isShowMask, setIsShowMask)}>
            <div className="option_delete operate_option"
              onClick={onOpeartionDelete(!isShowMask, setIsShowMask)}>
              删除该消息
            </div>
            <div className="option_cancel operate_option"
              onClick={onCancel(!isShowMask, setIsShowMask)}>
              取消
            </div>
          </div>
        ) : (
          <div />
        )
      }
    </div>
  )
}
