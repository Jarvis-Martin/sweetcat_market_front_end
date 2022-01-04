import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import './MyAddress.css';

import TitleBar from '../../components/title_bar/TitleBar';
import AddressCard from './address-card/AddressCard';
import { Add_Address_Page_URL } from '../../utils/PageUrl';
import { getScrollInstane } from '../../utils/BetterScroll';
import RestTemplate from '../../network/network';
import { USER_BASEURL } from '../../network/network_constant';
import { GlobalMessageDuration2s } from '../../utils/CommonConst';
import { message } from 'antd';

export default function MyAddress() {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default
  const my_address_ref = useRef()
  const [userId, setUserId] = useState("660946505393242112")
  const [restClient, setRestClient] = useState(new RestTemplate())
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(6)
  const [addressList, setAddressList] = useState()

  useEffect(() => {
    const my_address_scroller = getScrollInstane(my_address_ref.current, {
      scrollX: false,
      scrollY: true,
      click: true,
      pullUpLoad: true,
      preventDefault: false
    })

    my_address_scroller.on('pullingUp', () => {
      // 给底部商品推荐加载更多数据
    })

    refresh()
  }, [])

  /**
   * 加载跟多用户收货地址
   * @param {Integer} page page
   * @param {Integer} limit limit
   */
  const loadMore = (page, limit) => {
    setPage(page + 1)
    restClient.get(`${USER_BASEURL}/${userId}/address_list`, {
      params: {
        '_page': 0,
        '_limit': 0
      }
    }).then((result) => {
      if (result.errorCode !== "00000") {
        message.error(result.tip, GlobalMessageDuration2s)
        return
      }
      message.success(result.tip, GlobalMessageDuration2s)
    }).catch((err) => {
      message.error(err.tip, GlobalMessageDuration2s)
    })
  }

  // 刷新地址列表
  const refresh = () => {
    restClient.get(`${USER_BASEURL}/${userId}/address_list`, {
      params: {
        '_page': 0,
        '_limit': 6
      }
    }).then((result) => {
      setAddressList(result.data.address_list)
      if (result.errorCode !== "00000") {
        message.error(result.tip, GlobalMessageDuration2s)
        return
      }
      console.log('refresh data succes');
    }).catch((err) => {
      message.error(err.tip, GlobalMessageDuration2s)
    })
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
  /**
   * 页面跳转
   * @param {string} path 目标页面路径
   * @param {object}} params 页面跳转要携带的参数
   * @returns 
   */
  const navigate2 = (path, params) => {
    return e => {
      history.push(path, params)
    }
  }

  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='my_address'>
      <div className="title_bar">
        <TitleBar title='我的收货地址' left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />

      {/* 主内容区 */}

      <div className="content_section" ref={my_address_ref}>
        <div className="content_section_wrapper">
          <div className="content_main">
            {
              addressList ?
                (
                  addressList.map((address, idx) => {
                    return (
                      <div className="address_card_item" key={address.addressId}>
                        <AddressCard isDefaultAddress={true} addressDetail={address} refreshAddressList={refresh}/>
                      </div>
                    )
                  })
                ) : (
                  <div className="i"></div>
                )
            }
          </div>
        </div>
      </div>
      <div className="comment_btn_container">
        <div className="publich_comment_btn" onClick={navigate2(Add_Address_Page_URL, { title: "添加收货地址" })} >
          添加收货地址
        </div>
      </div>
    </div>
  )
}
