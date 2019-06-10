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

  componentDidMount() {
    this.setState({ loaded: true })
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
        <Profile></Profile>
        <Menu/>
        </ScrollView>
      </View>
    )
  }
}

export default User
