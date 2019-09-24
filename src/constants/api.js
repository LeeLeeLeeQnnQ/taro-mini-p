/**
 * NOTE HOST、HOST_M 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
export const host = HOST
export const hostM = HOST_M
/* eslint-enable */
// home
export const API_HOME_BANNER = `${host}/mini/Banner/index`
export const API_HOME_SPREAD = `${host}/mini/Shop/index`

// store-item
export const API_ITEM = `${host}/mini/Shop/show`

// apply
export const API_SHOW_INFO = `${host}/mini/User/searchOrder`
export const API_APPLY_ORDER = `${host}/mini/User/createOrder`

// info-list
export const API_ORDER_LIST = `${host}/mini/User/queryOrderList`
export const API_ORDER_DETAIL = `${host}/mini/User/queryOrder`
export const API_INVITE_LIST = `${host}/mini/User/queryInviteList`

// user
export const API_USER = `${host}/mini/User/info`
export const API_USER_LOGIN = `${host}/mini/User/info`
export const API_USER_INVITE = `${host}/mini/User/queryInvite`


// join
export const API_SHOP_LIST = `${host}/mini/Shop/getShopList`
export const API_CREATE_ORDER = `${host}/mini/User/createOrder`


// local
export const API_CITY_INFO = `${host}/mini/index/getCity`



