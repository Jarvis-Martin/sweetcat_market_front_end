import React, { useEffect, useState, useRef } from 'react'
import './AllComment.css'

import TitleBar from '../../components/title_bar/TitleBar'
import CommentPanel from '../../components/comment_panel/CommentPanel'
import { useHistory } from 'react-router'
import { Comment_All, Comment_Bad, Comment_Good, Comment_Indifferent, Comment_With_Pic } from '../../utils/CommentTypeTab'
import { changeStatus } from '../../utils/CommonFunction'
import { getScrollInstane } from '../../utils/BetterScroll'

export default function AllComment() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default
  // 当前 tab 页
  const [cur_tab, setCur_tab] = useState(Comment_All)
  const tabs = [
    {
      id: Comment_All,
      text: '全部',
      totalNumber: '2万+'
    },
    {
      id: Comment_Good,
      text: '好评',
      totalNumber: '2万+'
    },
    {
      id: Comment_Indifferent,
      text: '中评',
      totalNumber: '2万+'
    },
    {
      id: Comment_Bad,
      text: '差评',
      totalNumber: '2万+'
    },
    {
      id: Comment_With_Pic,
      text: '有图',
      totalNumber: '2万+'
    },
  ]
  const all_recommend_ref = useRef()
  useEffect(() => {
    const all_recommend_scroller = getScrollInstane(all_recommend_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    all_recommend_scroller.on('pullingUp', () => {
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

  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='all_comment'>
      <div className="title_bar">
        <TitleBar title='评论' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      {/* <div className="fake_select_bar" /> */}
          <div className="select_bar">
            {
              tabs.map((tab, idx) => {
                return (
                  <div key={idx}
                    className={`items ${cur_tab === tab.id ? 'border_bottom' : ''}`}
                    onClick={changeStatus(tab.id, setCur_tab)}>
                    {tab.text}
                    <span className='total_number'>{tab.totalNumber}</span>
                  </div>
                )
              })
            }
          </div>
          {/* 评论区 */}
      <div className="content_section" ref={all_recommend_ref}>
        <div className="content_section_wrapper">
          <div className="commend_section" id='comment'>
            <CommentPanel show_all={1} />
          </div>
        </div>
      </div>
    </div>
  )
}
