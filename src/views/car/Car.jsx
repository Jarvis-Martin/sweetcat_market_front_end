import React, { useEffect, useRef, useState } from 'react'
import './Car.css';

import { PreOrder_Page_URL, Category_Page_URL, Good_Detail_Page_URL } from '../../utils/PageUrl';
import { changeStatus, showConfirm } from '../../utils/CommonFunction'
import { GlobalMessageDuration2s } from '../../utils/CommonConst'

import Tabbar from '../../components/tabbar/Tabbar';
import GoodSelection from '../../components/good_selection/GoodSelection'
import GoodRecommendTopic from '../../components/good_recommend_panel/GoodRecommend';
import TitleBar from '../../components/title_bar/TitleBar'
import { useHistory } from 'react-router';
import { message, Checkbox, Affix } from 'antd';
import { getScrollInstane } from '../../utils/BetterScroll';

export default function Car() {
  const history = useHistory()
  const car_ref = useRef()
  const [isShowEditCompone, setIsShowEditCompone] = useState(false)
  const icon_parting_line = require('../../assets/icon_parting_line.png').default
  const icon_more = require('../../assets/icon_more_red.png').default
  // 用户选中的商品的列表（注意只包含 option.value
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [top, setTop] = useState(44);

  useEffect(() => {
    const car_scroller = getScrollInstane(car_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })
    /**
     * 右侧商品区，上拉加载更多
     */
    car_scroller.on('pullingUp', () => {
      car_scroller.finishPullUp()
    })
  }, [])
  /**
   * 页面跳转
   * @param {string} path 目标页面路径
   * @param {object}} params 页面跳转要携带的参数
   * @returns 
   */
  const navigate2 = (path, params) => {
    return e => {
      // e.stopPropagation()
      history.push(path, params)
    }
  }
  /**
   * 用户购物车内的商品
   */
  const options = [
    {
      label: <div className='good_selection_container' onClick={navigate2(Good_Detail_Page_URL, {})}>
        <GoodSelection />
      </div>, value: 'Apple'
    },
    {
      label: <div className='good_selection_container'>
        <GoodSelection />
      </div>, value: 'Pear'
    },
    {
      label: <div className='good_selection_container'>
        <GoodSelection />
      </div>, value: 'Orange'
    },
  ];
  /**
   * 用户点击 "移入收藏夹" 按钮时触发的回调
   * @returns 
   */
  const move2FavoriteFold = () => {
    return () => {
      message.success('移入收藏夹成功', GlobalMessageDuration2s)
    }
  }
  /**
   * 用户确认删除时触发的回调
   */
  const callback_onOK = () => {
    console.log('delete recommend good OK');
  }
  /**
   * 用户取消删除时触发的回调
   */
  const callback_onCancel = () => {
    console.log('delete recommend good Cancel');
  }

  /**
   * 用户选中、取选时触发的回调
   * @param {List} list 
   */
  const selectAndUnselect = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };
  /**
   * 用户选中、取选 "全选" 时触发的回调
   * @param {Event}} e 
   */
  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? options.map((option, idx) => {
      return option.value
    }) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <div className='car'>
      <div className="title_bar">
        <TitleBar title='购物车' />
      </div>
      <div className="fake_title_bar" />
      {/* 主内容区 */}

      <Affix offsetTop={top}>
        <div className="content_section" ref={car_ref}>
          <div className="content_section_wrapper">
            <div className="content_main">
              <div className="edit_btn">
                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                  全选
                </Checkbox>
                {
                  isShowEditCompone ? (
                    <div className="cancel_editCar" key='cancel' onClick={changeStatus(false, setIsShowEditCompone)}>取消</div>
                  ) : (
                    <div className="cancel_editCar" key='edit' onClick={changeStatus(true, setIsShowEditCompone)}>编辑</div>
                  )
                }
              </div>
              <div className="selection_goods">
                <Checkbox.Group options={options} value={checkedList} onChange={selectAndUnselect} />
                <div className="tip">
                  <div className="left">
                    您有优惠券：<span className='blue'>满400减20</span>，
                    再买<span className='red'>20</span>可使用
                  </div>
                  <div className="right">
                    <div className="text" onClick={navigate2(Category_Page_URL, {})}>去凑单</div>
                    <img src={icon_more} alt="" className="icon_more" />
                  </div>
                </div>
              </div>

              {/* 精品推荐 */}
              <div className="divition" />
              <img src={icon_parting_line} alt="" className="parting_line" />
              <div className="title">猜你喜欢</div>
              <div>
                <GoodRecommendTopic title='' show_footer='1' />
              </div>
            </div>
            <div className="fake_total_bar" />
          </div>
        </div>
      </Affix>
      <div className="total_bar">
        {
          isShowEditCompone ? (
            <div className="total_bar_component_container">
              <div className="car_move_2_favorite" onClick={move2FavoriteFold()}>移入收藏夹</div>
              <div className="car_delete" onClick={showConfirm(
                '你确定要将该商品移除购物车吗？',
                '',
                callback_onOK,
                callback_onCancel)
              }>删除</div>
            </div>
          ) : (
            <div className="total_bar_component_container">
              <div className="left_section">
                <div className="total_price">
                  <div>合计: </div>
                  <div className="price">￥560</div>
                </div>
                <div className="discount_price">已优惠:￥40</div>
              </div>
              <div className="compute_btn" onClick={navigate2(PreOrder_Page_URL, {})}>去付款 (3)</div>
            </div>
          )
        }

      </div>
      <div className="tabbar_container">
        <Tabbar />
      </div>
    </div>
  )
}
