import React from 'react'
import './Tabbar.css'
import { useState } from 'react'
import { Link,  useHistory } from 'react-router-dom'

import { Badge } from 'antd';


export default function Tabbar() {

  // const icon_home_default = require('../../assets/icon_home_default.png').default
  // const icon_home_activate = require('../../assets/icon_home_activate.png').default
  const icon_logo = require('../../assets/icon_logo.png').default
  const icon_category_default = require('../../assets/icon_category_default.png').default
  const icon_category_activate = require('../../assets/icon_category_activate.png').default
  const icon_car_default = require('../../assets/icon_car_default.png').default
  const icon_car_activate = require('../../assets/icon_car_activate.png').default
  const icon_profile_default = require('../../assets/icon_profile_default.png').default
  const icon_profile_activate = require('../../assets/icon_profile_activate.png').default

  const history = useHistory()
  let cur_path = history.location.pathname
  // profile 页面的消息数量
  const [profileMessage, setProfileMessage] = useState(1)

  return (
    <div id='navigation_bar'>
      <div className="item">
        <Link to='/home'>
          <img src={ icon_logo } alt="" className="icon" />
          <div className={ `text ${cur_path == '/home' ? 'activate' : '' }` }>主页</div>
        </Link>
      </div>
      <div className="item">
        <Link to='/category'>
          <img src={ cur_path == '/category' ? icon_category_activate : icon_category_default } alt="" className="icon" />
          <div className={ `text ${cur_path == '/category' ? 'activate' : '' }` }>分类</div>
        </Link>
      </div>
      <div className="item">
        <Link to='/car'>
          <img src={ cur_path == '/car' ? icon_car_activate : icon_car_default } alt="" className="icon" />
          <div className={ `text ${cur_path == '/car' ? 'activate' : '' }` }>购物测</div>
        </Link>
      </div>
      <div className="item">
        <Badge count={ profileMessage } size='small'>
          <Link to='/profile'>
            <img src={ cur_path == '/profile' ? icon_profile_activate : icon_profile_default } alt="" className="icon" />
            <div className={ `text ${cur_path == '/profile' ? 'activate' : '' }` }>我的</div>
          </Link>
        </Badge>
      </div>
    </div>
  )
}
