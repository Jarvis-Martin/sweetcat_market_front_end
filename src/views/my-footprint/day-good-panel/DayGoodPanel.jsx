import React, { useState } from 'react'
import './DayGoodPanel.css';

import { LongTouchEventTriggerDuration } from '../../../utils/CommonConst';
import { changeStatus, showConfirm } from '../../../utils/CommonFunction'
import { useHistory } from 'react-router';
export default function DayGoodPanel(props) {
  const history = useHistory()
  const avatar = require('../../../assets/avatar.jpg').default
  const [touchStartTimeStamp, setTouchStartTimeStamp] = useState()
  const [longTouchTimeot, setLongTouchTimeout] = useState()
  const onUserLongTouch = props.onUserLongTouch


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
      console.log('on touch start');
      setTouchStartTimeStamp(e.timeStamp)
      let timeOut = setTimeout(() => {
        onUserLongTouch(true, 'log_id: 123')(e)
        console.log('show mask');
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
  return (
    <div className="day_good_panel">
      {
        [1, 2, 3].map((item, idx) => {
          return (
            <div className="footprint_good_pic_item"
              key={ idx }
              onTouchStart={onTouchStart()}
              onTouchEnd={onTouchEnd()}
              onTouchMove={onTouchMove()}>
              <img src={avatar} alt="" className='footprint_good_pic' />
              <div className="footprint_price_container">
                ￥<span className='footprint_price'>999</span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
