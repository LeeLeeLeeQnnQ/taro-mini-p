import Taro from '@tarojs/taro'



function getCity(key) {
  return Taro.getStorage({ key: key }).then(res => res.data).catch(() => '')
}

function updateCity(data) {
  Taro.setStorage({ key: 'cityId', data: data['cityId'] || '' })
  Taro.setStorage({ key: 'latitude', data: data['latitude'] || '' })
  Taro.setStorage({ key: 'longitude', data: data['longitude'] || '' })
}

/**
 * 存储到本地位置信息
 */
export function setLocal() {
  Taro.getLocation().then((res)=>{
    let dot  = res
	  wx.request({
      url: 'https://wechat.baitime.cn/mini/index/getCity',
      data: res,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let data = res.data
        if(data.code == 0){
          updateCity({cityId:data.data.id,latitude:dot.latitude,longitude:dot.longitude})
        }else{
          updateCity({})
        }
      },
    })
	}).catch((err) => {
    Taro.showModal({
      title: '欢迎来到外卖美食社',
      content: '为更好的为您服务，需获得您的授权',
      showCancel:false,
    })
    .then(res => {
      Taro.navigateTo({
        url: `/pages/location/location`
      })
    })
  })
}

export function updateLocalCity() {
  Taro.getLocation().then((res)=>{
    let dot  = res
    return wx.request({
      url: 'https://wechat.baitime.cn/mini/index/getCity',
      data: res,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let data = res.data
        if(data.code == 0){
          return updateCity({cityId:data.data.id,latitude:dot.latitude,longitude:dot.longitude})
        }else{
          return updateCity({})
        }
      },
    })
  })
}


/**
 * 提取本地位置信息
 */
export function getLocal() {
  const cityId = getCity('cityId')
  return cityId
}
