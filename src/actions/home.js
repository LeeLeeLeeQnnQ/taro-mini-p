import {
  HOME_BANNER, HOME_SPREAD
} from '@constants/home'
import {
  API_HOME_BANNER,API_HOME_SPREAD
} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 首页数据
 * @param {*} payload
 */
export const dispatchBanner = payload => createAction({
  url: API_HOME_BANNER,
  type: HOME_BANNER,
  payload
})


/**
 * 推荐商品
 * @param {*} payload
 */
export const dispatchSpread = payload => createAction({
  url: API_HOME_SPREAD,
  type: HOME_SPREAD,
  payload
})
