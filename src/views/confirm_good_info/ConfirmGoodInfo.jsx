import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './ConfirmGoodInfo.css';
import { Car_Page_URL } from '../../utils/PageUrl';

import TitleBar from '../../components/title_bar/TitleBar';
import { Radio, Space } from 'antd';
import { showConfirm, showError } from '../../utils/CommonFunction';
import { getData } from '../../network/common_function';
import { GOOD_Detail_BASEURL } from '../../network/network_constant';
import { GET } from '../../network/request_methods';

export default function ConfirmGoodInfo(props) {
  const history = useHistory()

  const icon_back = require('../../assets/icon_back.png').default
  const icon_avatar = require('../../assets/avatar.jpg').default
  const icon_incr = require('../../assets/icon_follow.png').default
  const icon_decr = require('../../assets/icon_decr.png').default
  const [goodNumber, setGoodNumber] = useState(1)
  const [postType, setPostType] = useState(0)
  const [goodDetail, setGoodDetail] = useState()
  const [targetUrl, setTargetUrl] = useState(history.location.state.targetUrl)

  useEffect(() => {
    getData(GET , GOOD_Detail_BASEURL + `/${history.location.state.goodDetail.goodId}`)
      .then((result) => {
        console.log(result);
        setGoodDetail(result.data.good_info)
      });
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
   * 用户点击确认按钮
   * @param {string} path 目标页面路径
   * @param {object}} params 页面跳转要携带的参数
   * @returns 
   */
  const confirm = (path, params) => {
    return e => {
      console.log(postType === 0);
      if (postType === 0) {
        showError('请选择配送方式(必填)', '请根据您选择的商品类型、数量等，选择合适的配送方式，谢谢您的配合。')()
        return
      }
      path === Car_Page_URL ?
        history.goBack() :
        history.replace(targetUrl, {})
    }
  }

  const specifications = [
    {
      id: '0',
      title: '白色青春版',
      price: 888
    },
    {
      id: '1',
      title: '白色青春版',
      price: 888
    },
    {
      id: '2',
      title: '白色青春版',
      price: 888
    },
  ]
  /**
   * 用户点击 + 、- 时触发的回调
   * @param {Integer} nextStatus 
   * @param {Function} setterFunction 
   * @returns 
   */
  const changeStatus = (nextStatus, setterFunction) => {
    return () => {
      console.log(nextStatus);
      nextStatus = nextStatus <= 0 ? 1 : nextStatus
      setterFunction(nextStatus)
    }
  }
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setPostType(e.target.value)
  };
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='confirm_good_info_page'>
      <div className="title_bar">
        <TitleBar title='选择详细信息' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />
      {/* 主内容区 */}
      <div className="content_section">
        <div className="content_main">
          <div className="confirm_good_info_page_good_section">
            <img src={icon_avatar} alt="" className="good_pic" />
            <div className="good_right">
              <div className="confirm_good_info_page_price">￥888</div>
              <div className="confirm_good_info_page_stock">库存8888件</div>
              <div className="confirm_good_info_page_specification">白色青春版</div>
            </div>
          </div>
          <div className="confim_good_info_page_specification_section">
            {
              goodDetail ? (
                Object.keys(goodDetail.specification).map((key, idx) => {
                  return (
                    <div className="specification_icon">
                      <div className="confim_good_info_page_specification_header">
                        {key}
                      </div>
                      <div className="specification_btns">
                        {
                          goodDetail.specification[key].map((item, idx) => {
                            console.log(item.text);
                            return (
                              <div className="confim_good_info_page_specification_field" key={idx}>
                                {item.text}
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="i"></div>
              )
            }
            <div className="number">
              <div className="title">数量</div>
              <div className="number_operation">
                <img className="decr" src={icon_decr} id='detail' onClick={changeStatus(goodNumber + 1, setGoodNumber)} />
                <div className="text">{goodNumber}</div>
                <img className="incr" src={icon_incr} onClick={changeStatus(goodNumber + 1, setGoodNumber)} />
              </div>
            </div>
            <div className="post_type_container">
              <div className="post_type_title">
                配送方式<span className='post_type_title_tip color_red'>必填</span>
              </div>
              <div className="post_type_body">
                <Radio.Group onChange={onChange} value={postType}>
                  <Space direction="vertical">
                    <Radio value={1}>外卖</Radio>
                    <Radio value={2}>快递</Radio>
                  </Space>
                </Radio.Group>
              </div>
              <div className="post_type_tip color_mute">
                外卖方式仅支持同城，少量商品配送。快递方式支持非通常，大量商品配送。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="comment_btn_container">
        <div className="coupon_tip">
          <div className="color_mute">当前商品可使用优惠券：满100减20</div>
        </div>
        <div className="publich_comment_btn" onClick={confirm(targetUrl, {})}>
          确认
        </div>
      </div>
    </div>
  )
}
