import { ITEM_INFO } from '@constants/item'
import { API_ITEM  } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 首页数据
 * @param {*} payload
 */
export const dispatchItem = payload => createAction({
  url: API_ITEM,
  type: ITEM_INFO,
  payload
})
