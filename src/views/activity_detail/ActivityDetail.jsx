import React, { useEffect, useState } from 'react'
import './ActivityDetail.css';

import TitleBar from '../../components/title_bar/TitleBar';

import { useHistory } from 'react-router';
import RestTemplate from '../../network/network';
import { CMS_ACTIVITY_DETAIL_BASEURL } from '../../network/network_constant';
import { message } from 'antd';
import { GlobalMessageDuration2s } from '../../utils/CommonConst';

export default function ActivityDetail() {
  const history = useHistory()
  const icon_loading = require('../../assets/icon_loading.png').default
  const icon_load_error = require('../../assets/icon_load_error.png').default
  const icon_back = require('../../assets/icon_back.png').default
  const [activityId, setActivityId] = useState(history.location.state.activityId)
  const [restClient, setRestClient] = useState(new RestTemplate())
  const [activityDetail, setactivityDetail] = useState({})
  useEffect(() => {
    restClient.get(`${CMS_ACTIVITY_DETAIL_BASEURL}/${activityId}`)
      .then((result) => {
        setactivityDetail(result.data.activity_detail)
      }).catch((err) => {
        setactivityDetail(err)
        message.error(err.tip, GlobalMessageDuration2s)
      })
  }, [])
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
    <div className='activity_detail'>
      <div className="title_bar">
        <TitleBar title='活动详情页' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      {/* 主内容区 */}
      <div className="content_section">
        <div className="content_main">
          {
            activityDetail.picContent ?
              activityDetail.picContent.map((img, idx) => {
                return (
                  <img src={img} key={idx} className='content_pic' />
                )
              }) :
              activityDetail.errorCode === "00000" ?
                (
                  <img src={icon_loading} alt="" className="loading_circle" />
                ) : (
                  <div className="activity_detail_load_error_con">
                    <img src={icon_load_error} alt="" className="error_icon" />
                    <div className="activity_detail_load_error_tip">{activityDetail.tip}</div>
                  </div>
                )
          }
        </div>
      </div>
    </div>
  )
}
