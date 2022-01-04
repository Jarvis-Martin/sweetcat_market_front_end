import React from 'react'
import './OrderCard.css';
import { showConfirm } from '../../utils/CommonFunction';
import { useHistory } from 'react-router';

import GoodItem from '../../components/order_card/good_item/GoodItem';
import { Comment_Page_URL, Recommend_Page_URL } from '../../utils/PageUrl';
import { Menu, Dropdown, Button, Space } from 'antd';

export default function OrderCard() {
  const history = useHistory()
  const icon_garbag_can = require('../../assets/icon_garbag_can.png').default
  const icon_vertical_stripe = require('../../assets/icon_vertical_stripe.png').default

  const menu = (
    <Menu>
      <Menu.Item>
        <div target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          删除订单
        </div>
      </Menu.Item>
    </Menu>
  );

  const callback_onOK = () => {
    console.log('delete recommend good OK');
  }
  const callback_onCancel = () => {
    console.log('delete recommend good Cancel');
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
  return (
    <div className='order_card'>
      <div className="card_header">
        <div className="time">2020/04/30 17:42</div>
        <div className="order_card_right">
          <div className="order_status">待收货</div>
          <img className="order_card_parting_line" src={icon_vertical_stripe} />
          <img className="order_delete_btn" src={icon_garbag_can} onClick={
            showConfirm('你确定要删除该订单吗？',
              '删除后将无法恢复',
              callback_onOK,
              callback_onCancel)
          } />
        </div>
      </div>
      <div className="card_content">
        <GoodItem />
        <GoodItem />
        <div className="bottom">
          <div className="left">
            <div className="total_money">共4件 实付款: <span className='red'>￥750</span></div>
            {/* 此处按钮颜色视订单状态而定：
                待付款：红色
                确认收货：蓝色
                退换货：黄色
                已收货：灰色
                去评价：绿色（每人只能评价一次）首次评价后，显示 "追加评论：绿色"
              */}
            <div className="order_btns">
              <div className="order_btn_more">
                <Dropdown overlay={menu} placement="bottomLeft">
                  <div>更多</div>
                </Dropdown>
              </div>
              <div className="order_btn_right">
                <div className="order_btn">确认收货</div>
                <div className="order_btn" onClick={navigate2(Recommend_Page_URL, { target: Recommend_Page_URL, title: '发表推荐' })}>去推荐</div>
                <div className="order_btn" onClick={navigate2(Comment_Page_URL, { target: Comment_Page_URL, title: '发表评论' })}>去评价</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
