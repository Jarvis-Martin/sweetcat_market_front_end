import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './EditItemPage.css';
import { Input, message } from 'antd';
import { changeStatus } from '../../utils/CommonFunction';

import TitleBar from '../../components/title_bar/TitleBar';
import { GlobalMessageDuration1s } from '../../utils/CommonConst';
import RestTemplate from '../../network/network';
import { USER_BASEURL } from '../../network/network_constant';

export default function EditItemPage(props) {
  const history = useHistory()
  const icon_back = require('../../assets/icon_back.png').default

  const [userId, setUserId] = useState("660946505393242112")
  const { TextArea } = Input;
  const [key, setKey] = useState(history.location.state.key)
  const [params, setParams] = useState(history.location.state.params)
  const [newValue, setNewValue] = useState(history.location.state.oldValue)
  const [restClient, setRestClient] = useState(new RestTemplate())

  // const title = history.location.state.title

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
   * 用户输入时触发的回调
   * @param {Event} e 
   */
  const onChange = e => {
    setNewValue(e.target.value)
  };

  const saveItemValue = (params) => {
    return e => {
      restClient.get(`${USER_BASEURL}/${userId}?${key}=${newValue}`)
        .then((result) => {
          if (result.errorCode !== "00000") {
            message.error(result.tip, GlobalMessageDuration1s)
            return
          }
          message.success(result.tip, GlobalMessageDuration1s)
          setTimeout(() => {
            history.goBack()
          }, 500);
        }).catch((err) => {
          message.error(err.tip, GlobalMessageDuration1s)
        })
    }
  }
  const title_bar_left_icon = (
    <img src={icon_back} alt="" onClick={go2(-1)} />
  )
  return (
    <div className='edit_item_page'>
      <div className="title_bar">
        <TitleBar title={history.location.state.title} left={title_bar_left_icon} />
      </div>
      <div className="fake_title_bar" />

      <div className="content_section">
        <div className="content_main">
          <div className="edit_item_input">
            <TextArea showCount maxLength={20}
              bordered={false}
              autoFocus
              defaultValue={newValue}
              placeholder={history.location.state.placeholder}
              onChange={onChange} />
          </div>
        </div>
      </div>
      <div className="comment_btn_container">
        <div className="publich_comment_btn" onClick={saveItemValue(params)}>
          保存
        </div>
      </div>
    </div>
  )
}
