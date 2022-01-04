// 订单状态：0：未支付；1：待发货；2：待收货；3：待评价（交易成功）；4：已取消
export const STATUS_UNPAY = '0'
export const STATUS_UNSEND = '1'
export const STATUS_UNRECEIVE = '2'
export const STATUS_UNCOMMENT = '3'
export const STATUS_CANCEL = '4'
// 订单标签：0：待支付；1：买家已付款；2：卖家已发货；3：交易成功；4：交易关闭（用户取消订单所致）
export const TAG_UNPAY = '0'
export const TAG_PAYED = '1'
export const TAG_SENDED = '2'
export const TAG_FINISHED = '3'
export const TAG_CANCEL = '4'

export const OrderStatusAndBtns = [
  // 待支付
  {
    status: STATUS_UNPAY,
    status_text: '未支付',
    tag: TAG_UNPAY,
    tag_text: '未支付',
    btns: [
      {
        text: '加入购物车',
        target: '',
      },
      {
        text: '取消订单',
        target: '',
      },
      {
        text: '修改地址',
        target: '',
      },
      {
        text: '付款',
        target: '',
      },
    ]
  },
  // 待发货
  {
    status: STATUS_UNSEND,
    status_text: '待发货',
    tag: TAG_PAYED,
    tag_text: '买家已付款',
    btns: [
      {
        text: '修改地址',
        target: '',
      },
    ]
  },
  // 待收货
  {
    status: STATUS_UNRECEIVE,
    status_text: '待收货',
    tag: TAG_SENDED,
    tag_text: '卖家已发货',
    btns: [
      {
        text: '确认收货',
        target: '',
      },
    ]
  },
  // 待评价
  {
    status: STATUS_UNCOMMENT,
    status_text: '待评价',
    tag: TAG_FINISHED,
    tag_text: '交易成功',
    btns: [
      {
        text: '删除订单',
        target: '',
      },
      {
        text: '加入购物车',
        target: '',
      },
      {
        text: '去评价',
        target: '',
      },
    ]
  },
  // 已取消
  {
    status: STATUS_CANCEL,
    status_text: '已取消',
    tag: TAG_CANCEL,
    tag_text: '交易关闭',
    btns: [
      {
        text: '删除订单',
        target: '',
      },
      {
        text: '加入购物车',
        target: '',
      }
    ]
  }
]
