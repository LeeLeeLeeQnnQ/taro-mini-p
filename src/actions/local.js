import { CITY_INFO } from '@constants/local'
import { API_CITY_INFO } from '@constants/local'
import { createAction } from '@utils/redux'

/**
 * 获取用户信息
 * @param {*} payload
 */
export const dispatchCity = payload => createAction({
  url: API_CITY_INFO,
  fetchOptions: {
    showToast: false,
    autoLogin: false
  },
  type: CITY_INFO,
  payload
})

