import React from 'react'
import { useHistory } from 'react-router';
import './GoodItem.css';

import { Good_Detail_Page_URL } from '../../../utils/PageUrl'

export default function GoodItem(props) {

  const icon_loading = require('../../../assets/icon_loading.png').default

  const history = useHistory()
  const good = props.good

  /**
  * 跳转到 path 指定的页面
  * @param {string} path 目标页面的 url
  * @returns void
  */
  const navigate2 = (path, title, from, params) => {
    return () => {
      history.push(path, {
        title,
        from,
        "good_id": good.commodityId
      })
    }
  }

  return (
    <div className='home_good_item' onClick={navigate2(Good_Detail_Page_URL, '', history.location.pathname)}>
      <div className="good_pic">
        <img className='pic'
          src={good ? good.picSmall : icon_loading}
          className={`pic ${good ? '' : 'loading_circle'}`} />
      </div>
      <div className={`good_name  ${good ? '' : 'bgc_gray'}`}>{good ? good.commodityName : ''}</div>
      <div className={`good_price ${good ? '' : 'bgc_gray'} `}>{good ? good.currentPrice : ''}</div>
      <div className={`good_other ${good ? '' : 'bgc_gray'} `}>{good ? good.guarantee : ''}</div>
    </div>
  )
}
