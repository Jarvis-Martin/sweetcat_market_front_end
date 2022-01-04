import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import './MyFootprint.css'
import { Calendar, Select, Radio, Col, Row, Typography, Switch } from 'antd';
import * as moment from 'moment';
import { getScrollInstane } from '../../utils/BetterScroll';
import TitleBar from '../../components/title_bar/TitleBar';
import DayGoodPanel from './day-good-panel/DayGoodPanel';
import { LongTouchEventTriggerDuration } from '../../utils/CommonConst';
import { changeStatus, showConfirm } from '../../utils/CommonFunction'

export default function MyFootprint() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default
  const [userSelectedDate, setUserSelectedDate] = useState(moment())
  const [isShowCalenderPicker, setIsShowCalenderPicker] = useState(false)
  const my_fans_ref = useRef()

  const [isShowMask, setIsShowMask] = useState(false)

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
  }, [])
  /**
   * 用户选择日期
   * @param {Date} date 用户选择的日期
   */
  function onPanelChange(date) {
    console.log(`用户选择了：${date.year()}年${date.month() + 1}月${date.date()}日`);
    setUserSelectedDate(date)
    setIsShowCalenderPicker(!isShowCalenderPicker)
    console.log('获取本月初至选中的日期的所有浏览记录');
  }
  /**
 * 前往指定页面
 * @param {int} number 
 */
  const go2 = number => {
    return () => {
      history.go(number)
    }
  }
  const OK_Callback = () => {
    console.log('用户确认删除该消息');
  }

  const Cancel_Callback = () => {
    console.log('用户确认删除该消息');
  }
  /**
   * 用户点击删除时触发：1.删除该数据；2.关闭 mask
   * @param {any} nextStatus 
   * @param {Function} setterFunction 
   * @returns 
   */
  const onOpeartionDelete = (nextStatus, setterFunction) => {
    return e => {
      showConfirm('您确定要删除该条消息吗？', '删除后将无法恢复',
        OK_Callback,
        Cancel_Callback)()
    }
  }
  const onCancel = (nextStatus, setterFunction) => {
    return e => {
      e.stopPropagation()
      setterFunction(nextStatus)
    }
  }

  const onUserLongTouch = (nextStatus, target_id) => {
    return e => {
      console.log(`del ${target_id}`);
      setIsShowMask(nextStatus)
    }
  }
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='my_footprint'>
      <div className="title_bar">
        <TitleBar title='足迹' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      <div className="content_section" ref={my_fans_ref}>
        <div className="content_section_wrapper">
          {
            isShowCalenderPicker ? (
              <div className="footprint_date_picker">
                <Calendar
                  fullscreen={false}
                  onSelect={onPanelChange}
                  defaultValue={userSelectedDate}
                  headerRender={({ value, type, onChange, onTypeChange }) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];

                    const current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    for (let i = 0; i < 12; i++) {
                      current.month(i);
                      months.push(localeData.monthsShort(current));
                    }

                    for (let index = start; index < end; index++) {
                      monthOptions.push(
                        <Select.Option className="month-item" key={`${index}`}>
                          {months[index]}
                        </Select.Option>,
                      );
                    }
                    const month = value.month();
                    const date = value.date();

                    const year = value.year();
                    const options = [];
                    for (let i = year - 10; i < year + 10; i += 1) {
                      options.push(
                        <Select.Option key={i} value={i} className="year-item">
                          {i}
                        </Select.Option>,
                      );
                    }
                    return (
                      <div style={{ padding: 8 }}>
                        {/* <Typography.Title level={4}>Custom header</Typography.Title> */}
                        <Row gutter={8}>
                          <Col>
                            <Select
                              size="middle"
                              dropdownMatchSelectWidth={false}
                              className="my-year-select"
                              onChange={newYear => {
                                const now = value.clone().year(newYear);
                                onChange(now);
                              }}
                              value={String(year)}
                            >
                              {options}
                            </Select>
                          </Col>
                          <Col>
                            <Select
                              size="middle"
                              dropdownMatchSelectWidth={false}
                              value={String(month)}
                              onChange={selectedMonth => {
                                const newValue = value.clone();
                                newValue.month(parseInt(selectedMonth, 10));
                                onChange(newValue);
                              }}
                            >
                              {monthOptions}
                            </Select>
                          </Col>
                          <Col>
                            <Select
                              size="middle"
                              disabled
                              dropdownMatchSelectWidth={false}
                              value={String(date)}
                              onChange={selectedMonth => {
                                const newValue = value.clone();
                                newValue.month(parseInt(selectedMonth, 10));
                                onChange(newValue);
                              }}
                            >
                              {monthOptions}
                            </Select>
                          </Col>
                        </Row>
                      </div>
                    );
                  }}
                />
              </div>
            ) : (<div />)
          }
          <div className="content_main">
            <div className="footprint_switch_container">
              <div className="footprint_current_date">{userSelectedDate.format('YYYY/MM/DD')}</div>
              <div className="footprint_switch_container_right">
                {
                  isShowCalenderPicker ? (
                    <div className="footprint_switch_text">隐藏日历</div>
                  ) : (
                    <div className="footprint_switch_text">显示日历</div>
                  )
                }
                <Switch onClick={changeStatus(!isShowCalenderPicker, setIsShowCalenderPicker)} />
              </div>
            </div>
            <div className="footprint_goods_panel">
              <div className="footprint_goods_panel_title">9月21</div>
              <div className="footprint_goods_gooditem_group">
                <DayGoodPanel onUserLongTouch={onUserLongTouch} />
              </div>
              <div className="footprint_goods_gooditem_group">
                <DayGoodPanel />
              </div>
            </div>
            <div className="footprint_goods_panel">
              <div className="footprint_goods_panel_title">9月21</div>
              <div className="footprint_goods_gooditem_group">
                <DayGoodPanel />
              </div>
              <div className="footprint_goods_gooditem_group">
                <DayGoodPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        isShowMask ? (
          // <div className="mask_message" onClick={ changeStatus(!isShowMask, setIsShowMask)}>
          <div className="mask_message" onClick={changeStatus(!isShowMask, setIsShowMask)}>
            <div className="option_delete operate_option"
              onClick={onOpeartionDelete(!isShowMask, setIsShowMask)}>
              删除该消息
            </div>
            <div className="option_cancel operate_option"
              onClick={onCancel(!isShowMask, setIsShowMask)}>
              取消
            </div>
          </div>
        ) : (
          <div />
        )
      }
    </div>
  )
}
