import {
  ORDER_LIST , ORDER_DETAIL
} from '@constants/info'
import {
  API_ORDER_LIST , API_ORDER_DETAIL
} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 首页数据
 * @param {*} payload
 */
export const dispatchOrderList = payload => createAction({
  url: API_ORDER_LIST,
  type: ORDER_LIST,
  payload
})


/**
 * 首页数据
 * @param {*} payload
 */
export const dispatchOrderDetail = payload => createAction({
  url: API_ORDER_DETAIL,
  type: ORDER_DETAIL,
  payload
})

