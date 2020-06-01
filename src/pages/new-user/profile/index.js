import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import defaultAvatar from '@assets/default-avatar.png'
import './index.scss'

export default class Profile extends Component {

  static defaultProps = {
    data:{
      nickName:'',
      avatarUrl:''
    },
  }
  state = {
    loaded: false,
    isAuth: false
  }
  // 顶级生命周期
  componentWillMount () {
    const { data } = this.props
    if(!!data.nickName && !!data.avatarUrl){
      this.setState({ userInfo : data , isAuth : true })
    }
  }

  handleLogin = (e) => {
    let that = this;
    if(e.detail.errMsg == "getUserInfo:ok"){
      this.setState({ userInfo : JSON.parse(e.detail.rawData) , isAuth : true })
      wx.login({
      success: res => {
        var code = res.code;
        if (code) {
            e.detail.code = code;
            wx.request({
              url: 'https://wechat.baitime.cn/mini/User/info',
              data: e.detail,
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
              },
            })
          }
        }
      })
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

          <View className='user-profile__info'>
            {!!this.state.isAuth && <Text className='user-profile__info-name'>
              {this.state.userInfo.nickName ? this.state.userInfo.nickName : '未登陆'}
            </Text>}
            {!this.state.isAuth && <Button open-type="getUserInfo" className='user-profile__wrap-btn' onGetUserInfo={this.handleLogin}>点击登陆</Button>}
          </View>
        </View>
      </View>
    )
  }
}
