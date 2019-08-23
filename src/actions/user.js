import { USER_INFO, USER_LOGIN, USER_LOGOUT , USER_MYINVITE } from '@constants/user'
import { API_USER, API_USER_LOGIN , API_USER_INVITE } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 获取用户信息
 * @param {*} payload
 */
export const dispatchUser = payload => createAction({
  url: API_USER,
  fetchOptions: {
    showToast: false,
    autoLogin: false
  },
  type: USER_INFO,
  payload
})


/**
 * 获取用户邀请信息
 * @param {*} payload
 */
export const dispatchInvite = payload => createAction({
  url: API_USER_INVITE,
  type: USER_MYINVITE,
  payload
})

/**
 * 用户登录
 * @param {*} payload
 */
export const dispatchLogin = payload => createAction({
  url: API_USER_LOGIN,
  type: USER_LOGIN,
  payload
})

/**
 * 用户退出登录
 */
export const dispatchLogout = () => ({ type: USER_LOGOUT })
