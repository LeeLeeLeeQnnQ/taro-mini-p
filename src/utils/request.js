import Taro from '@tarojs/taro'
import { API_USER, API_USER_LOGIN } from '@constants/api'

const CODE_SUCCESS = 0
const CODE_AUTH_EXPIRED = 1024

function getStorage(key) {
  return Taro.getStorage({ key: key }).then(res => res.data).catch(() => '')
}

function updateStorage(data) {
  return Promise.all([
    Taro.setStorage({ key: 'token', data: data['token'] || '' }),
  ])
}

function wxlogin() {
  wx.login({
  success: res => {
    var code = res.code;
    if (code) {
        wx.request({
          url: 'https://wechat.baitime.cn/wechat/User/info',
          data: { code: code },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data.code == 0) {
              updateStorage(res.data.data)
            } else {
              wxlogin()
            }
          },
        })
      } else {
        wxlogin()
      }
    }
  })
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const { url, payload, method = 'GET', showToast = true, autoLogin = true } = options
  const token = await getStorage('token')
  if(!token){
    await wxlogin();
  }
  const header = {
      'cookie': token ?  'token='+token : ''
  }
  header['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then( async (res) => {
    const { code, data } = res.data
    
    // 判断是不是成功
    if (code !== CODE_SUCCESS) {
      if (code === CODE_AUTH_EXPIRED) {
        await updateStorage({})
      }
      return Promise.reject(res.data)
    }

    // if (url === API_USER_LOGIN) {
    //   await updateStorage(data)
    // }
    return data || res
  }).catch( async (err) => {
    const defaultMsg = err.code === CODE_AUTH_EXPIRED ? '服务异常' : '请求异常'
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || defaultMsg,
        icon: 'none'
      })
    }

    if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
      Taro.navigateTo({
        url: '/pages/user-login/user-login'
      })
    }

    return Promise.reject({ message: defaultMsg, ...err })
  })
}
