import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import './MyFans.css'

import TitleBar from '../../components/title_bar/TitleBar';
import LikdedPersonCard from '../liked_person/liked_person_card/LikedPersonCard';
import { getScrollInstane } from '../../utils/BetterScroll';
import { changeStatus } from '../../utils/CommonFunction';
import { GlobalMessageDuration2s } from '../../utils/CommonConst';
import { message } from 'antd';
import { RELATIONSHIP_BASEURL } from '../../network/network_constant';
import RestTemplate from '../../network/network';

export default function LikedPerson() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default
  const icon_noting_here = require('../../assets/icon_noting_here.png').default
  // 当前 tab 页
  const [cur_tab, setCur_tab] = useState(0)
  const [dataList, setDataList] = useState([])
  const [userId, setUserId] = useState("660946505393242112")
  const [restClient, setRestClient] = useState(new RestTemplate())

  const tabs = [
    {
      id: 0,
      text: '粉丝'
    },
    {
      id: 1,
      text: '关注'
    }
  ]
  const my_fans_ref = useRef()

  useEffect(() => {
    const my_fans_scroller = getScrollInstane(my_fans_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    my_fans_scroller.on('pullingUp', () => {
      // 给底部商品推荐加载更多数据
    })

    // 获取数据
    let targetUrl = ''
    switch (cur_tab) {
      case 0:
        targetUrl = `${RELATIONSHIP_BASEURL}/user/${userId}/fans_list`
        break
      case 1:
        targetUrl = `${RELATIONSHIP_BASEURL}/user/${userId}/subscriber_list`
    }

    restClient.get(targetUrl)
      .then((result) => {
        if (result.errorCode !== "00000") {
          message.error(result.tip, GlobalMessageDuration2s)
          return
        }
        setDataList(result.data.data_list)
      }).catch((err) => {
        message.error(err.tip, GlobalMessageDuration2s)
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
    <div className='my_fans'>
      <div className="title_bar">
        <TitleBar title='我的粉丝' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      {/* <div className="fake_select_bar" /> */}
      <div className="content_section" ref={my_fans_ref}>
        <div className="content_section_wrapper">
          <div className="select_bar">
            {
              tabs.map((tab, idx) => {
                return (
                  <div key={idx}
                    className={`items ${cur_tab == tab.id ? 'border_bottom' : ''}`}
                    onClick={changeStatus(tab.id, setCur_tab)}>
                    {tab.text}
                  </div>
                )
              })
            }
          </div>
          <div className="content_main">
            {
              dataList ? (
                dataList.map((item, idx) => {
                  return (
                    <div className="person_item">
                      <LikdedPersonCard />
                    </div>
                  )
                })) :
                (
                  <div className="i">
                    <img src={icon_noting_here} alt="" />
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
