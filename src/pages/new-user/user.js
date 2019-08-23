import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/user'
import { getWindowHeight } from '@utils/style'
import Profile from './profile'
import Menu from './menu'
import './user.scss'

@connect(state => state.user, { ...actions })
class NewUser extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      lkey:0,
      inviteInfo:{
        is_order: 0 ,
        not_order: 0
      }
    }
  }

  componentWillMount () {
    Taro.getUserInfo().then((res) =>{
      const { rawData } = res || '';
      this.setState({ userInfo : JSON.parse(rawData)})
      this.props.dispatchInvite({isGetinfo: true}).then((res) => {
        this.setState({ inviteInfo: res })
        this.setState({ loaded: true })
      })
    }).catch((err)=>{
      this.props.dispatchInvite({isGetinfo: true}).then((res) => {
        this.setState({ inviteInfo: res })
        this.setState({ loaded: true })
      })
    })
  }


  render () {
    let that = this;
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
        <Menu data={this.state.inviteInfo} />
        </ScrollView>
      </View>
    )
  }
}

export default NewUser
