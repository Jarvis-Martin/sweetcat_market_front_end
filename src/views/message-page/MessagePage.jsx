import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './MessagePage.css';

import { LongTouchEventTriggerDuration } from '../../utils/CommonConst';
import { Good_Detail_Page_URL } from '../../utils/PageUrl';
import { changeStatus, showConfirm } from '../../utils/CommonFunction'

import TitleBar from '../../components/title_bar/TitleBar';
import MessageCard from './message-card/MessageCard'
import { getScrollInstane } from '../../utils/BetterScroll';

export default function MessagePage() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default
  const icon_refresh_white = require('../../assets/icon_refresh_white.png').default
  const message_ref = useRef()
  const [isShowMask, setIsShowMask] = useState(false)
  const [isReaded, setIsReaded] = useState(false)
  const [touchStartTimeStamp, setTouchStartTimeStamp] = useState()
  const [longTouchTimeot, setLongTouchTimeout] = useState()
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

  useEffect(() => {
    const message_scroller = getScrollInstane(message_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    message_scroller.on('pullingUp', () => {
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
  const refreshData = (e) => {
    // 刷新数据
    console.log("refresh data");
  }
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  const title_bar_right_icon = (
    <img src={icon_refresh_white} alt="" onClick={refreshData} />
  )
  return (
    <div className='message_page'>
      <div className="title_bar">
        <TitleBar title='我的消息' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />

      <div className="message_content_section" ref={message_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            {/* 精品推荐 */}
            <div className="message_card_container"
              onTouchStart={onTouchStart()}
              onTouchEnd={onTouchEnd()}
              onTouchMove={onTouchMove()}>
              <MessageCard />
            </div>
            {/* <div className="message_card_container"
              onTouchStart={onTouchStart()}
              onTouchEnd={onTouchEnd()}
              onTouchMove={onTouchMove()}>
              <MessageCard />
            </div> */}
          </div>
        </div>
      </div>
      {/* 用户长按某消息时触发 */}
      {
        isShowMask ? (
          // <div className="mask_message" onClick={ changeStatus(!isShowMask, setIsShowMask)}>
          <div className="mask_message" onClick={changeStatus(!isShowMask, setIsShowMask)}>
            <div className="option_delete operate_option"
              onClick={onOpeartionDelete(!isShowMask, setIsShowMask)}>
              删除该消息
            </div>
            <div className="option_delete operate_option"
              onClick={onOpeartionSetReadedOrNot(!isReaded, setIsReaded)}>
              {
                isReaded ? '标记为未读' : '标记为已读'
              }
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