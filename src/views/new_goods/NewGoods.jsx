import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './NewGoods.css';

import { getData } from '../../network/common_function'
import { changeStatus } from '../../utils/CommonFunction';
import { getScrollInstane } from '../../utils/BetterScroll';

import TitleBar from '../../components/title_bar/TitleBar';
import GoodRecommendTopic from '../../components/good_recommend_panel/GoodRecommend';
import { GET } from '../../network/request_methods';
import { GOOD_NEW_BASEURL } from '../../network/network_constant';
import { data } from 'province-city-china/data';

export default function NewGoods() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default

  const title = history.location.state.title
  const new_good_ref = useRef()
  const [page, setPage] = useState(0)
  const [convertedGoodList, setConvertedGoodList] = useState([])

  useEffect(() => {
    const new_good_scroller = getScrollInstane(new_good_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })
    new_good_scroller.on('pullingUp', () => {
      // 给底部商品推荐加载更多数据
    })

    getData(GET, GOOD_NEW_BASEURL, {
      params: {
        "_limit": 30,
        "_page": page,
      }
    }).then((result) => {
      setConvertedGoodList(convertGoodList(result.data.good_list))
    })
  }, [])
  // 当前 tab 页
  const [cur_tab, setCur_tab] = useState(0)

  const tabs = [
    {
      id: 0,
      text: '全部',
    },
    {
      id: 1,
      text: '蛋白粉',
    },
    {
      id: 2,
      text: '增肌粉',
    },
    {
      id: 3,
      text: '筋膜枪',
    },
    {
      id: 4,
      text: '乳清蛋白',
    },
  ]

  /**
   * 前往指定页面
   * @param {int} number 
   */
  const go2 = number => {
    return () => {
      history.go(number)
    }
  }

  const convertGoodList = (data) => {
    const groupedGoodList = []
    for (var i = 0, len = data.length; i < len; i += 2) {
      groupedGoodList.push(data.slice(i, i + 2));
    }
    return groupedGoodList
  }
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='new_goods_page'>
      <div className="title_bar">
        <TitleBar title={title} left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      <div className="fake_select_bar" />
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
      {/* 主内容区 */}
      <div className="content_section" ref={new_good_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            {/* 精品推荐 */}
            <div className="topic">
              <GoodRecommendTopic title=''
                GoodList={convertedGoodList}
                show_footer='1' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
