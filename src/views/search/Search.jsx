import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './Search.css'

import TitleBar from '../../components/title_bar/TitleBar';
import { useHistory } from 'react-router';
import { Input, Space } from 'antd';
import { Switch } from 'antd';

import GoodCard from './good_card/GoodCard';
import { getScrollInstane } from '../../utils/BetterScroll';
import { changeStatus } from '../../utils/CommonFunction';

export default function Search() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default
  const { Search } = Input;

  // 是否展示热门搜索关键词？
  const [isShowHotSearch, setIsShowHotSearch] = useState(true)
  // 是否展示热门搜索关键词？
  const [keyword, setKeyword] = useState(history.location.state.keyword)
  // 搜索框是否展示 loadin icon？
  const [isShowLoading, setIsShowLoading] = useState(false)

  const fake_hot_keywords = [
    '蛋白粉',
    '增加粉',
    '筋膜枪',
    '乳清蛋白',
    '蛋白粉',
    '增加粉',
    '筋膜枪',
    '乳清蛋白',
  ]
  const search_ref = useRef()
  useEffect(() => {
    const search_scroller = getScrollInstane(search_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    search_scroller.on('pullingUp', () => {
      // 给底部商品推荐加载更多数据
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

  /**
   * 点击搜索按钮后触发，请求数据
   * @param {*}} value 
   * @returns 
   */
  const onSearch = (keyword, e) => {
    e.stopPropagation()
    setIsShowLoading(true)
    setTimeout(() => {
      setIsShowLoading(false)
    }, 2000);
  };
  /**
   * 用户输入时，获取输入值
   * @param {event} e 
   */
  const onChange = (e) => {
    e.stopPropagation()
    setKeyword(e.target.value)
  };

  /**
   * 用户点击热搜关键字时触发，把热搜关键字赋值给 keyword，用于后续网络请求
   * @param {string} keyword 热搜关键字
   * @returns 
   */
  const fillSearchWith = keyword => {
    return e => {
      e.stopPropagation()
      setKeyword(keyword)
    }
  }
  // title_bar 左侧返回按钮组件
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='search'>
      <div className="title_bar">
        <TitleBar title='搜索' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      <div className="fake_select_bar" />
      <div className="search_page_search_bar">
        <div className="search_main">
          <Search placeholder="请输入商品名"
            allowClear
            onSearch={onSearch}
            onChange={onChange}
            value={keyword}
            loading={isShowLoading}
            style={{ width: '100%' }} />
        </div>
      </div>
      <div className="content_section" ref={search_ref}>
        <div className="content_section_wrapper">
          <div className="hot_search_panel">
            <div className="top">
              <div className="title">热门搜索</div>
              {/* <div className="is_show_btn" onClick={ changeStatus(!isShowHotSearch, setIsShowHotSearch) }>
            {
              isShowHotSearch ? '隐藏' : '显示'
            }
          </div> */}
              <div className="is_show_btn">
                <Switch
                  onClick={changeStatus(!isShowHotSearch, setIsShowHotSearch)}
                  checkedChildren="隐藏"
                  unCheckedChildren="显示"
                  defaultChecked />
              </div>
            </div>
            {
              isShowHotSearch ?
                (
                  <div className='bottom keyword_panel'>
                    {
                      fake_hot_keywords.map((keyword, idx) => {
                        return (
                          <div className="keyword" key={idx} onClick={fillSearchWith(keyword)}>
                            {keyword}
                          </div>
                        )
                      })
                    }
                  </div>
                ) : (
                  <div />
                )
            }
          </div>
          <div className="right_section">
            <div className="search_good_car">
              <GoodCard />
            </div>
            <div className="search_good_car">
              <GoodCard />
            </div>
            <div className="search_good_car">
              <GoodCard />
            </div>
            <div className="search_good_car">
              <GoodCard />
            </div>
            <div className="search_good_car">
              <GoodCard />
            </div>
            <div className="search_good_car">
              <GoodCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
