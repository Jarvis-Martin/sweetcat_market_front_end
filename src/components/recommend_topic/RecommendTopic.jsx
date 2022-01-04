import React from 'react'
import './RecommendTopic.css'

import { All_Recommend_Page_URL, Recommend_Good_Detail_Page_URL } from '../../utils/PageUrl'

import GoodCard from './good_card/GoodCard';
import { useHistory } from 'react-router';

export default function RecommendTopic(props) {
  const history = useHistory()

  const icon_right_narrow = require('../../assets/icon_right_narow.png').default
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
    <div className='recommend_topic'>
      <div className="topic_header">
        <div className="title">{props.title}</div>
        <div className="more">
          <div className="text" onClick={navigate2(All_Recommend_Page_URL, {})}>查看全部</div>
          <img className='icon_more' src={icon_right_narrow} alt="" />
        </div>
      </div>
      <div className="recommend_good_card_con" onClick={navigate2(Recommend_Good_Detail_Page_URL, {})}>
        <GoodCard />
      </div>
      <div className="recommend_good_card_con" onClick={navigate2(Recommend_Good_Detail_Page_URL, {})}>
        <GoodCard />
      </div>
    </div>
  )
}
