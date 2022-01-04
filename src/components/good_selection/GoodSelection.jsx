import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { Car_Page_URL, Confirm_Good_Info_Page_URL } from '../../utils/PageUrl'
import './GoodSelection.css'


export default function GoodSelection() {
  const history = useHistory()
  const [goodNumber, setGoodNumber] = useState(1)

  const icon_good = require('../../assets/avatar.jpg').default
  const icon_incr = require('../../assets/icon_follow.png').default
  const icon_decr = require('../../assets/icon_decr.png').default

  const changeStatus = (nexStatus, setter_function) => {
    return (e) => {
      e.preventDefault()
      e.stopPropagation()
      nexStatus = nexStatus <= 0 ? 1 : nexStatus
      setter_function(nexStatus)
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
      e.preventDefault()
      e.stopPropagation()
      history.push(path, params)
    }
  }
  const showSelectGoodSpecificationPanel = () => {
    return e => {
      console.log('click specification');
      e.preventDefault()
      e.stopPropagation()
      navigate2(Confirm_Good_Info_Page_URL, {targetUrl: Car_Page_URL})(e)
    }
  }
  return (
    <div className="good_selection">
      {/* <input type='checkbox' name='good' className='good_select_btn' /> */}
      {/* <img src={ icon_selected } alt="" className="icon_selection" /> */}
      <div className="pic_icon_container">
        <img src={icon_good} alt="" className="pic_icon" />
      </div>
      <div className="good_info">
        <div className="field good_name">海德利纯享乳清蛋白海德利纯享乳清蛋白海德利纯享乳清蛋白</div>
        <div className="field good_gurantee">
          <div className="good_gurantee_text" onClick={showSelectGoodSpecificationPanel()}>
            白色，时尚上衣
          </div>
        </div>
        <div className="field good_price">
          <div className="price_section">
            <div className="good_cur_price price">￥155</div>
            <div className="good_old_price price">￥155</div>
          </div>
          <div className="number">
            <img className="decr_btn" src={icon_decr} onClick={changeStatus(goodNumber - 1, setGoodNumber)} />
            <div className="text">{goodNumber}</div>
            <img className="incr_btn" src={icon_incr} onClick={changeStatus(goodNumber + 1, setGoodNumber)} />
          </div>
        </div>
      </div>
    </div>
  )
}
