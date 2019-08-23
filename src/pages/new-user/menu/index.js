import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
// import jump from '@utils/jump'
import classNames from 'classnames'
import './index.scss'

const MENU_LIST = [
  {
    key: 'order',
    text: '活动报名信息',
    url: '/pages/info-list/info-list',
  },
]





export default class Menu extends Component {

  static defaultProps = {
    data:{
      is_order: 0 ,
      not_order: 0,
      lkey:0,
    },
  }

  handleClick = (menu) => {
    let _this = this;
    this.setState({ lkey: 0 }, ()=> {
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
    })
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
          if(this.state.lkey == 5){
            this.setState({ loaded: true })
            Taro.showToast({
              title: '网络错误！',
              icon: 'none'
            })
            return
          }
          let lkey = this.state.lkey*1 + 1;
          this.setState( { lkey: lkey }, ()=> {
            this.wxLogin()
          })
        }
      }
    })
  }

  wxLoginInvite = () => {
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
                Taro.navigateTo({
                  url: `/pages/invite-list/invite-list`
                })
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
          if(this.state.lkey == 5){
            this.setState({ loaded: true })
            Taro.showToast({
              title: '网络错误！',
              icon: 'none'
            })
            return
          }
          let lkey = this.state.lkey*1 + 1;
          this.setState( { lkey: lkey }, ()=> {
            this.wxLoginInvite();
          })
        }
      }
    })
  }

  wxLoginReceive = () => {
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
                Taro.navigateTo({
                  url: `/pages/receive-list/receive-list`
                })
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
          if(this.state.lkey == 5){
            this.setState({ loaded: true })
            Taro.showToast({
              title: '网络错误！',
              icon: 'none'
            })
            return
          }
          let lkey = this.state.lkey*1 + 1;
          this.setState( { lkey: lkey }, ()=> {
            this.wxLoginReceive();
          })
        }
      }
    })
  }

  viewInvite = () => {
    let _this = this;
    this.setState({ lkey: 0 }, ()=> {
      this.getStorage('token').then(function (rs) {
          if(!!rs){
            Taro.navigateTo({
              url: `/pages/invite-list/invite-list`
            })
            return
          }
          _this.wxLoginInvite()
      });
    })
  }

  viewReceive = () => {
    let _this = this;
    this.setState({ lkey: 0 }, ()=> {
      this.getStorage('token').then(function (rs) {
          if(!!rs){
            Taro.navigateTo({
              url: `/pages/receive-list/receive-list`
            })
            return
          }
          _this.wxLoginReceive()
      });
    })
  }

  render () {
    const { is_order ,  not_order} = this.props.data
    return (
      <View className='user-menu'>
        <View className='user-menu__title'>
          <Text className='user-menu__title-txt'>我的活动</Text>
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
        <View className='user-menu__title'>
          <Text className='user-menu__title-txt'>我的邀请（公众号海报邀请）</Text>
        </View>
        <View className='user-menu__invite-warp'>
          <View className='user-menu__invite-warp-item' onClick={this.viewInvite}>
            <View className='user-menu__invite-warp-item-h3'>
              {not_order}
              <View className='user-menu__invite-warp-item-h3-span'>人</View>
            </View>
            <View className='user-menu__invite-warp-item-p'>未下单</View>
          </View>
          <View className='user-menu__invite-warp-item user-menu__invite-warp-rb' onClick={this.viewReceive}>
            <View className='user-menu__invite-warp-item-h3'>
              {is_order}
              <View className='user-menu__invite-warp-item-h3-span'>人</View>
            </View>
            <View className='user-menu__invite-warp-item-p'>已下单</View>
          </View>
        </View>
      </View>
    )
  }
}
