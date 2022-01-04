import React from 'react'
import { useState } from 'react'
import './LikedPersonCard.css'

import { message } from 'antd';
import { RELATIONSHIP_BASEURL } from '../../../network/network_constant';
import { GlobalMessageDuration2s } from '../../../utils/CommonConst';
import RestTemplate from '../../../network/network';

export default function LikdedPersonCard(props) {
  const [isFollowed, setIsFollowed] = useState(props.data.isLiked)

  const icon_avatar = require('../../../assets/avatar.jpg').default
  const icon_follow = require('../../../assets/icon_follow.png').default
  const icon_cancel_follow = require('../../../assets/icon_cancel_follow.png').default

  const [userId, setUserId] = useState("660946505393242112")
  const [restClient, setRestClient] = useState(new RestTemplate())
  const [data, setData] = useState(props.data)

  // 关注 和 取关时触发的函数
  const follow_notFollow = (nextStatus, setter_function) => {
    return () => {
      let targetUrl = ''
      if (isFollowed === 0) {
        targetUrl = `${RELATIONSHIP_BASEURL}/user/${userId}/like/${props.data.userId}`
      } else {
        targetUrl = `${RELATIONSHIP_BASEURL}/user/${userId}/dislike/${props.data.userId}`
      }
      restClient.get(targetUrl)
        .then((result) => {
          if (result.errorCode !== "00000") {
            message.error(result.tip, GlobalMessageDuration2s)
          }
          setter_function(nextStatus)
          message.success(result.tip, GlobalMessageDuration2s)
        }).catch((err) => {
          message.error(err.tip, GlobalMessageDuration2s)
        })
    }
  }
  return (
    <div className="remender_section">
      <div className="avatar_con">
        <img src={data.avatar} alt="" className="liked_person_avatar" />
      </div>
      <div className="user_info">
        <div className="user_name">{data.nickName}</div>
        <div className="description">{data.personalizedSignature}</div>
        <div className="fans_num">粉丝：{data.fansNumber}</div>
      </div>
      {
        isFollowed ? (
          <div className="follow_btn has_followed" onClick={follow_notFollow(0, setIsFollowed)}>
            <img src={icon_cancel_follow} alt="" className="icon_follow" />
            <div className="text">取消关注</div>
          </div>
        ) : (
          <div className="follow_btn not_followed" onClick={follow_notFollow(1, setIsFollowed)}>
            <img src={icon_follow} alt="" className="icon_follow" />
            <div className="text">关注</div>
          </div>
        )
      }
    </div>
  )
}
