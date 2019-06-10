/**
 * NOTE HOST、HOST_M 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
export const host = HOST
export const hostM = HOST_M
/* eslint-enable */
// home
export const API_HOME_BANNER = `${host}/wechat/Banner/index`
export const API_HOME_SPREAD = `${host}/wechat/Shop/index`

// store-item
export const API_ITEM = `${host}/wechat/Shop/show`

// join
export const API_SHOP_LIST = `${host}/wechat/Shop/getShopList`
export const API_CREATE_ORDER = `${host}/wechat/User/createOrder`

// info-list
export const API_ORDER_LIST = `${host}/wechat/User/queryOrderList`
export const API_ORDER_DETAIL = `${host}/wechat/User/queryOrder`

// user
export const API_USER = `${host}/wechat/User/info`
export const API_USER_LOGIN = `${host}/wechat/User/info`