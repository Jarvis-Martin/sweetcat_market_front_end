import React, { useEffect, useRef, useState } from 'react'
import './Category.css'
import { Affix } from 'antd';
import TitleBar from '../../components/title_bar/TitleBar';
import Tabbar from '../../components/tabbar/Tabbar';
import SearchBar from '../../components/search_bar/SearchBar';
import GoodCard from '../../components/good_card/GoodCard';
import { getScrollInstane } from '../../utils/BetterScroll';

export default function Category() {
  const [top, setTop] = useState(44);
  const left_section = useRef()
  const right_section = useRef()
  const [cur_selected_type_idx, setCur_selected_type_idx] = useState('0')
  useEffect(() => {
    const left_section_scroller = getScrollInstane(left_section.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })
    const right_section_scroller = getScrollInstane(right_section.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })
    /**
     * 右侧商品区，上拉加载更多
     */
    right_section_scroller.on('pullingUp', () => {
      right_section_scroller.finishPullUp()
    })
  }, [])
  const icon_vertical_stripe = require('../../assets/icon_vertical_stripe.png').default

  const hotSearchKeyword = [
    {
      id: '0',
      title: '热门搜索',
    },
    {
      id: '1',
      title: '小吃系列',
    },
    {
      id: '2',
      title: '零食系列',
    },
    {
      id: '3',
      title: '奶茶系列',
    },
    {
      id: '4',
      title: '果茶系列',
    },
    {
      id: '5',
      title: '咖啡系列',
    },
    {
      id: '6',
      title: '面包系列',
    },
    {
      id: '6',
      title: '蛋糕系列',
    },
  ]
  const onSelectType = idx => {
    return e => {
      setCur_selected_type_idx(idx)
    }
  }
  return (
    <div className='category'>
      <div className="title_bar">
        <TitleBar title='分类' />
      </div>
      <div className="fake_title_bar" />
      <div className="search_section">
        {/* 搜索栏 */}
        <SearchBar />
      </div>
      <Affix offsetTop={top}>
        <div className="content_section">
          <div className="content_main">
            {/* 左栏：显示分类选项 */}
            <div className="left_section" ref={left_section}>
              <div className="left_section_wrapper">
                {/* 一个item为一个选项 */}
                {
                  hotSearchKeyword.map((keyword, idx) => {
                    return (
                      <div className  ="good_type_item">
                        {
                          cur_selected_type_idx === keyword.id ? (
                            <img src={icon_vertical_stripe} alt="" className="icon" />
                          ) : (<div className='icon' />)
                        }
                        {/* <div className="title">热门搜索</div> */}
                        <div className={`item_text ${cur_selected_type_idx === keyword.id ? 'color_blue' : 'color_mute'}`}
                          key={keyword.id}
                          onClick={onSelectType(keyword.id)}>
                          {keyword.title}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            {/* 右栏：显示商品 */}
            <div className="right_section" ref={right_section}>
              <div className="right_section_wraper">
                <div className="category_good_item">
                  <GoodCard />
                </div>
                <div className="category_good_item">
                  <GoodCard />
                </div>
                <div className="category_good_item">
                  <GoodCard />
                </div>
                <div className="category_good_item">
                  <GoodCard />
                </div>
                <div className="category_good_item">
                  <GoodCard />
                </div>
                <div className="category_good_item">
                  <GoodCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Affix>
      <div className="tabbar_container">
        <Tabbar />
      </div>
    </div>
  )
}
