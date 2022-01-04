import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Good_Detail_Page_URL } from '../../utils/PageUrl';
import './GoodRecommend.css'

import GoodItem from './good_item/GoodItem';

import { LongTouchEventTriggerDuration } from '../../utils/CommonConst';
import { changeStatus, showConfirm } from '../../utils/CommonFunction'
export default function GoodRecommend(props) {
  const history = useHistory()
  // 由于收藏夹 和 多出公用了该 推荐商品组件，
  // 但只有 收藏夹页面允许删除操作，故通过 父组件传递 allow_del 来判断是否可以删除
  const [allowDel, setAllowDel] = useState(props.allow_del)
  const [isShowMask, setIsShowMask] = useState(false)
  const [touchStartTimeStamp, setTouchStartTimeStamp] = useState()
  const [longTouchTimeot, setLongTouchTimeout] = useState()
  const [goodList, setGoodList] = useState()

  useEffect(() => {
    setGoodList(props.GoodList)
  })
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
  const OK_Callback = () => {
    console.log('用户确认删除该消息');
    // 用户点击 ok 按钮时，删除对应的记录
  }

  const Cancel_Callback = () => {
    console.log('用户确认删除该消息');
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
      }, goodList);
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
  const onCancel = (nextStatus, setterFunction) => {
    return e => {
      e.stopPropagation()
      setterFunction(nextStatus)
    }
  }
  return (
    <div className='good_recommend_panel'>
      <div className="topic_header">
        <div className="title">{props.title}</div>
      </div>
      <div className="topic_content">
        <div className="items">
          { 
            goodList ? (
              goodList.map((good_group, idx) => {
                return (
                  <div className="item_group">
                    {
                      good_group.map((good, idx) => {
                        return (
                          <div className="item_group_item"
                            onTouchStart={onTouchStart()}
                            onTouchEnd={onTouchEnd()}
                            onTouchMove={onTouchMove()}
                            onClick={navigate2(Good_Detail_Page_URL, {})}>
                            <GoodItem good={good} />
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            ) : (
              <div className="item_group">
                <div className="item_group_item">
                  <GoodItem />
                </div>
                <div className="item_group_item">
                  <GoodItem />
                </div>
              </div>
            )
          }
        </div>
      </div>
      {
        isShowMask && allowDel ? (
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
