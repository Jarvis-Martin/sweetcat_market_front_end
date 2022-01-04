import BScroll from 'better-scroll'
/**
 * 根据给定的 target 生成一个 betterscroll 对象
 * @param {ReactNode} target 节点
 * @param {Object} params 
 * @returns 
 */
export function getScrollInstane(target, params) {
  return new BScroll(target, {
    ...params
  })
}
