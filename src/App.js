import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css'

import { BackTop } from 'antd';

import PubSub from 'pubsub-js'

import Home from './views/home/Home'
import Category from './views/category/Category'
import Car from './views/car/Car'
import Profile from './views/profile/Profile'
import MyOrder from './views/my_order/MyOrder';
import NewGoods from './views/new_goods/NewGoods';
import GoodDetail from './views/good_detail/GoodDetail';
import AllComment from './views/all_comment/AllComment';
import SecondKill from './views/second_kill/SecondKill';
import Search from './views/search/Search';
import AllRecommend from './views/all_recommend/AllRecommend';
import Recommender from './views/recommender/Recommender';
import ActivityDetail from './views/activity_detail/ActivityDetail';
import LikedPerson from './views/liked_person/LikedPerson';
import MyRecommend from './views/my_recommend/MyRecommend';
import MyFans from './views/my_fans/MyFans';
import AddAddress from './views/add_address/AddAddress';
import MyAddress from './views/my-address/MyAddress';
import Comment from './views/comment/Comment';
import MyFavorite from './views/my_favorite/MyFavorite';
import MyCoupon from './views/my_coupon/MyCoupon';
import FeedBack from './views/feedback/FeedBack';
import Settings from './views/settings/Settings';
import PreOrder from './views/pre_order/PreOrder';
import CommentDetail from './views/comment_detail/CommentDetail';
import OrderDetail from './views/order_detail/OrderDetail';
import ConfirmGoodInfo from './views/confirm_good_info/ConfirmGoodInfo';
import EditInfo from './views/edit-info/EditInfo';
import EditItemPage from './views/edit-item-page/EditItemPage';
import MessagePage from './views/message-page/MessagePage';
import AccountAndSecurity from './views/settings/account-and-security/AccountAndSecurity';
import ChangePhone from './views/settings/account-and-security/change-phone/ChangePhone';
import ChangePassword from './views/settings/account-and-security/change-password/ChangePassword';
import LoginPage from './views/login-page/LoginPage';
import Register from './views/register-page/Register';

import { useEffect, useState } from 'react';
import { changeStatus } from './utils/CommonFunction';
import { Event_ShowBackTop, Event_ShowUserMask } from './utils/PubSubEventType';
import RecommendGoodDetail from './views/recommand-good-detail/RecommendGoodDetail';
import CouponHistory from './views/coupon_history/CouponHistory';
import MyFootprint from './views/my-footprint/MyFootprint';
import CouponCenter from './views/coupon_center/CouponCenter';
import CoinCenter from './views/coin_center/CoinCenter';
import CoinHistory from './views/coin_history/CoinHistory';
import CoinExchangeCoupon from './views/coin_exchange_coupon/CoinExchangeCoupon';
import EditOrderAddress from './views/edit_order_address/EditOrderAddress';

function App() {
  const icon_backtop = require('./assets/icon_backtop.png').default
  const avatar = require('./assets/avatar.jpg').default
  const [userInfo, setuserInfo] = useState({})
  const [isShowMask, setIsShowMask] = useState(false)
  useEffect(() => {
    PubSub.subscribe(Event_ShowUserMask, params => {
      setuserInfo(params)
      console.log('展示用户信息 mask'); 
      setIsShowMask(!isShowMask)
    })
  })

  const backTop_Style = {
    height: 36,
    width: 36,
    lineHeight: '40px',
    borderRadius: 18,
    backgroundColor: '#fff'
  };
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={ Home }></Route>
        <Route path="/category" component={ Category }></Route>
        <Route path="/car" component={ Car }></Route>
        <Route path="/profile" component={ Profile }></Route>

        <Route path="/my-order" component={ MyOrder }></Route>
        <Route path="/new-goods" component={ NewGoods }></Route>
        <Route path="/exquisite-good" component={ NewGoods }></Route>
        <Route path="/good-detail" component={ GoodDetail }></Route>
        <Route path="/all-comment" component={ AllComment }></Route>
        <Route path="/second-kill" component={ SecondKill }></Route>
        <Route path="/search" component={ Search }></Route>
        <Route path="/all-recommend" component={ AllRecommend }></Route>
        <Route path="/recommender-profile" component={ Recommender }></Route>
        <Route path="/activity" component={ ActivityDetail }></Route>
        <Route path="/fans-follow" component={ LikedPerson }></Route>
        <Route path="/my-recommend" component={ MyRecommend }></Route>
        {/* <Route path="/my-fans" component={ MyFans }></Route> */}
        <Route path="/my-address" component={ MyAddress }></Route>
        <Route path="/add-address" component={ AddAddress }></Route>
        <Route path="/edit-address" component={ AddAddress }></Route>
        <Route path="/comment" component={ Comment }></Route>
        <Route path="/comment-detail" component={ CommentDetail }></Route>
        <Route path="/my-favorite" component={ MyFavorite }></Route>
        <Route path="/my-coupon" component={ MyCoupon }></Route>
        <Route path="/feedback" component={ FeedBack }></Route>
        <Route path="/settings" component={ Settings }></Route>
        <Route path="/pre-order" component={ PreOrder }></Route>
        <Route path="/order-detail" component={ OrderDetail }></Route>
        <Route path="/edit-order-address" component={ EditOrderAddress }></Route>
        <Route path="/confirm-good-info" component={ ConfirmGoodInfo }></Route>
        <Route path="/edit-info" component={ EditInfo }></Route>
        <Route path="/edit-item" component={ EditItemPage }></Route>
        <Route path="/my-message" component={ MessagePage }></Route>
        <Route path="/account-and-security" component={ AccountAndSecurity }></Route>
        <Route path="/change-phone" component={ ChangePhone }></Route>
        <Route path="/change-password" component={ ChangePassword }></Route>
        <Route path="/login" component={ LoginPage }></Route>
        <Route path="/register" component={ Register }></Route>
        <Route path="/recommend-good-detail" component={ RecommendGoodDetail }></Route>
        <Route path="/recommend" component={ Comment }></Route>
        <Route path="/coupon-history" component={ CouponHistory }></Route>
        <Route path="/my-footprint" component={ MyFootprint }></Route>
        <Route path="/coupon-center" component={ CouponCenter }></Route>
        <Route path="/coin-center" component={ CoinCenter }></Route>
        <Route path="/coin-history" component={ CoinHistory }></Route>
        <Route path="/exchange-coupon" component={ CoinExchangeCoupon }></Route>
        <Redirect to='/home' />
      </Switch>
      <div className="fake_footer" />
      <div className="backTop">
        <BackTop>
          <img style={backTop_Style} src={ icon_backtop } />
        </BackTop>
      </div>

      {
        isShowMask ? (
          <div className="user_mask" onClick={ changeStatus(!isShowMask, setIsShowMask)}>
            <div className="user_info_mask_main">
              <img className="user_mask_avatar" src={ avatar } />
              <div className="user_mask_username">萌小豪520</div>
              <div className="user_mask_desc">可爱可爱，爱了爱了。</div>
              <div className="comment_btn_container">
                <div className="publich_comment_btn" onClick={ changeStatus(!isShowMask, setIsShowMask)}>
                  知道了
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )
      }
    </div>
  );
}

export default App;
