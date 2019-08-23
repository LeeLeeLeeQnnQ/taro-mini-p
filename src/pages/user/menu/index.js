import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
// import jump from '@utils/jump'
import classNames from 'classnames'
import './index.scss'

const MENU_LIST = [{
  key: 'order',
  text: '活动报名信息',
  url: '/pages/info-list/info-list',
}]

export default class Menu extends Component {

  handleClick = (menu) => {
    let _this = this;
    this.getStorage('token').then(function (rs) {
        if(!!rs){
          if (menu.key === 'order') {
            Taro.navigateTo({
              url: menu.url
            })
          }
          return
        }
        _this.wxLogin(menu)
    });
  }

  getStorage = (key) => {
       return Taro.getStorage({ key: key }).then(res => res.data).catch(() => '')
  }

  wxLogin = (menu) => {
    wx.login({
    success: res => {
      var code = res.code;
      if (code){
          wx.request({
            url: 'https://wechat.baitime.cn/wechat/User/info',
            data: { code: code },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if(res.data.code == 0) {
                Taro.setStorage({ key: 'token', data: res.data.data['token'] || '' })
                if (menu.key === 'order') {
                  Taro.navigateTo({
                    url: menu.url
                  })
                }
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
                    url: `/pages/user/user`
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
          wxlogin()
        }
      }
    })
  }

  render () {
    return (
      <View className='user-menu'>
        <View className='user-menu__title'>
          <Text className='user-menu__title-txt'>我的</Text>
        </View>
        {MENU_LIST.map((menu, index) => {
          // NOTE 不用伪元素选择器，需自行计算
          return (
            <View
              key={menu.key}
              className='user-menu__item'
              onClick={this.handleClick.bind(this, menu)}
            >
              <Text className='user-menu__item-txt'>{menu.text}</Text>
              <Text className='user-menu__item-arrow'>＞ </Text>
            </View>
          )
        })}
      </View>
    )
  }
}
