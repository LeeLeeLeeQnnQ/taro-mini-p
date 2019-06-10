import { SHOP_LIST_INFO , CREATE_ORDER } from '@constants/join'
import { API_SHOP_LIST , API_CREATE_ORDER  } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 首页数据
 * @param {*} payload
 */
export const dispatchShopList = payload => createAction({
  url: API_SHOP_LIST,
  type: SHOP_LIST_INFO,
  payload
})


export const dispatchCreateOrder = payload => createAction({
  url: API_CREATE_ORDER,
  type: CREATE_ORDER,
  method:"POST",
  payload
})