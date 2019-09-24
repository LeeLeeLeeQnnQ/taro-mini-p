import { APPLY_ORDER , SHOW_INFO , SHOP_LIST_INFO } from '@constants/apply'
import { API_APPLY_ORDER , API_SHOW_INFO , API_SHOP_LIST } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 首页数据
 * @param {*} payload
 */

export const dispatchApplyOrder = payload => createAction({
  url: API_APPLY_ORDER,
  type: APPLY_ORDER,
  method:"POST",
  payload
})


export const dispatchShopList = payload => createAction({
  url: API_SHOP_LIST,
  type: SHOP_LIST_INFO,
  payload
})


export const dispatchShowInfo = payload => createAction({
  url: API_SHOW_INFO,
  type: SHOW_INFO,
  method:"POST",
  payload
})