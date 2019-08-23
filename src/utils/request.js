import Taro from '@tarojs/taro'
import { API_USER, API_USER_LOGIN } from '@constants/api'

const CODE_SUCCESS = 0
const CODE_AUTH_EXPIRED = 1024
let flkey = 0

function getStorage(key) {
  return Taro.getStorage({ key: key }).then(res => res.data).catch(() => '')
}

function updateStorage(data) {
  return Taro.setStorage({ key: 'token', data: data['token'] || '' })
}

async function wxlogin(cb,options) {
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
            if(res.data.code == 0) {
             updateStorage(res.data.data)
            }else if (res.data.code == 20) {
              Taro.showToast({
                title: '请稍后再试！',
                icon: 'none'
              })
            }else if (res.data.code == 2148) {
              Taro.showModal({
                title: '请先登陆！',
                content: '',
                showCancel:false,
              })
              .then(res => 
                Taro.switchTab({
                  url: `/pages/new-user/user`
                })
              )
            }else{
              Taro.showToast({
                title: res.msg,
                icon: 'none'
              })
            }
          },
        })
      } else {
        if(flkey == 5){
          Taro.showToast({
            title: '网络错误！',
            icon: 'none'
          })
          return
        }
        flkey = flkey*1 + 1;
        wxlogin();
      }
    }
  })
  return cb(options);
}

async function sendRequest(options){
  const { url, payload = {}, method = 'GET', showToast = true, autoLogin = true } = options
  const token = await getStorage('token')
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
      if(code == CODE_AUTH_EXPIRED){
        Taro.showToast({
          title: '请登陆！',
          icon: 'none'
        })
        return
      }
      Taro.showToast({
        title: res.data.msg,
        icon: 'none'
      })
      return
    }
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
/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  flkey = 0;
  const { payload = {} } = options
  let isGetinfo = payload.isGetinfo || false;
  const isToken = await getStorage('token')
  if(isGetinfo && !isToken){
    return wxlogin(sendRequest,options);
  }else{
    return await sendRequest(options)
  }
}
