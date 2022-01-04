import React from 'react'
import './TopicPanel.css'

import GoodItem from './good_item/GoodItem'
import { useHistory } from 'react-router'

export default function TopicPanel(props) {

  const icon_right_narrow = require('../../assets/icon_right_narow.png').default
  const icon_refresh = require('../../assets/icon_refresh.png').default

  const history = useHistory()
  const goodList = props.GoodList

  /**
  * 跳转到 path 指定的页面
  * @param {string} path 目标页面的 url
  * @returns void
  */
  const navigate2 = (path, params) => {
    return () => {
      history.push(path, params)
    }
  }

  return (
    <div className='topic_panel'>
      <div className="topic_header">
        <div className="title">{props.title}</div>
        <div className="more" onClick={navigate2(props.navigate_target_url, { title: props.title, cur_tab: '0' })}>
          <div className="text">查看全部</div>
          <img className='icon_more' src={icon_right_narrow} alt="" />
        </div>
      </div>
      <div className="topic_content">
        <div className="items">
          {
            goodList && goodList.length !== 0 ? (
              goodList.map((good, idx) => {
                return (
                  <div className="i" key={good.goodId}>
                    <GoodItem good={good} />
                  </div>
                )
              })
            ) : (
              <div className="i">
                <GoodItem />
                <GoodItem />
                <GoodItem />
              </div>
            )
          }

        </div>
        {
          props.show_footer == '1' ?
            <div className="topic_footer">
              <img src={icon_refresh} alt="" className="icon_refresh" />
              <div className="text" onClick={props.refreshDataFunction}>换一批</div>
            </div> : ''
        }
      </div>
    </div>
  )
}
