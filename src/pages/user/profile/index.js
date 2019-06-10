import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import defaultAvatar from '@assets/default-avatar.png'
import './index.scss'

export default class Profile extends Component {

  state = {
    loaded: false,
    isAuth: false
  }
  // 顶级生命周期
  componentWillMount () {
    Taro.getUserInfo().then((res) =>{
      const { rawData } = res
      this.setState({ userInfo : JSON.parse(rawData) , isAuth : true })
    }).catch((err)=>{
      return Promise.reject({ message: err })
    })
  }

  handleLogin = (e) => {
    if(e.detail.errMsg == "getUserInfo:ok"){
      this.setState({ userInfo : JSON.parse(e.detail.rawData) , isAuth : true })
    }
  }

  render () {
    return (
      <View className='user-profile'>
        {/* // NOTE 背景图片：Image 标签 + position absolute 实现 */}
        <Image
          className='user-profile__bg'
          mode='widthFix'
        />

        <View className='user-profile__wrap'>
          <View className='user-profile__avatar'>
            <Image
              className='user-profile__avatar-img'
              src={this.state.userInfo.avatarUrl || defaultAvatar}
            />
          </View>

          <View className='user-profile__info' onClick={this.handleLogin}>
            <Text className='user-profile__info-name'>
              {this.state.userInfo.nickName ? this.state.userInfo.nickName : '未登录'}
            </Text>
          </View>
          {!this.state.isAuth && <Button open-type="getUserInfo" className='user-profile__wrap-btn' onGetUserInfo={this.handleLogin}>点击授权</Button>}
        </View>
      </View>
    )
  }
}
