import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/user'
import { getWindowHeight } from '@utils/style'
import Profile from './profile'
import Menu from './menu'
import './user.scss'

@connect(state => state.user, { ...actions })
class User extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount () {
    this.wxlogin()
  }
  componentDidMount() {
    
  }

  wxlogin = () => {
    wx.login({
    success: res => {
      var code = res.code;
      if (code) {
          this.getUserInfo( code )
        } else {
          this.wxlogin()
        }
      }
    })
  }

  getUserInfo = ( code ) =>{
    Taro.getUserInfo().then((res) =>{
      res.code = code
      const { rawData } = res || '';
      this.setState({ userInfo : JSON.parse(rawData)})
      this.setState({ loaded: true })
      wx.request({
        url: 'https://wechat.baitime.cn/wechat/User/info',
        data: new Object(res,{code : code}),
        method: 'POST',
        header: {
          'content-type': 'application/json'
        }
      })
    }).catch((err)=>{
      this.setState({ userInfo : ''})
      this.setState({ loaded: true })
      return Promise.reject({ message: err })
    })
  }



  render () {
    if (!this.state.loaded) {
      return <Loading />
    }
    return (
      <View className='user'>
        <ScrollView
          scrollY
          className='user__wrap'
          style={{ height: getWindowHeight() }}
        >
        <Profile data={this.state.userInfo}></Profile>
        <Menu/>
        </ScrollView>
      </View>
    )
  }
}

export default User
