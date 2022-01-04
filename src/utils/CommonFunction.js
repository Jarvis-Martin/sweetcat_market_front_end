import { ExclamationCircleOutlined } from '@ant-design/icons';

import { Modal } from 'antd';
import { LongTouchEventTriggerDuration } from './CommonConst';

/**
 * 通过 setter_function 修改状态
 * @param {boolean} nexStatus 下一个状态
 * @param {function} setter_function 状态的 setter 函数
 * @returns 
 */
export function changeStatus (nexStatus, setter_function) {
  return (e) => {
    // e.stopPropagation()
    setter_function(nexStatus)
  }
}


/**
 * 
 * @param {String} title confirm 对话框的标题
 * @param {String}} content 描述性内容
 * @param {Function} OK_Callback 用户点击 OK 时的回调
 * @param {Funciton} Cancel_Callback 用户点击 Cancel 时的回调
 * @returns 
 */
const { confirm, error } = Modal;
export function showConfirm(title, content, OK_Callback, Cancel_Callback) {
  return () => {
    confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      content,
      onOk() {
        OK_Callback()
      },
      onCancel() {
        Cancel_Callback()
      },
    });
  }
}

export function showError(title, content) {
  return () => {
    error({title, content});
  }
}

/**
 * 获得文件 base64
 * @param {File} img 图片文件
 * @param {Function} callback 
 */
export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
