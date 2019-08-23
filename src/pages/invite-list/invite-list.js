import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView , Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getWindowHeight } from '@utils/style'
import defaultAvatar from '@assets/default-avatar.png'
import * as actions from '@actions/info'
import './invite-list.scss'


const INFO_SIZE = 20
@connect(state => state.info, { ...actions})
class InviteList extends Component {
  config = {
    navigationBarTitleText: '活动列表'
  }

  state = {
    loaded: false,
    loading: false,
    page: 1,
    hasMore: true,
    inviteList:[],
  }

  componentWillMount(){
    
  }

  // 已经挂载数据生命周期函数
  componentDidMount() {
    this.setState({ loaded: true })
    // 获取传播列表函数
    this.loadInviteList()
  }

  loadInviteList = () => {
    if (!this.state.hasMore || this.state.loading) {
      return
    }
    const payload = {
      page: this.state.page,
      page_size: INFO_SIZE,
      isGetinfo: true,
      type:1
    }
    this.setState({ loading: true })
    this.props.dispatchInviteList(payload).then((res) => {
      const list = !!res.list ? this.state.inviteList.concat(res.list) : this.state.inviteList;
      const page = res.page;
      this.setState({ inviteList: list })
      this.setState({
        loading: false,
        hasMore: res.more,
        page: page && page.next_page
      })
    }).catch(() => {
      this.setState({ loading: false })
    })
  }

  render () {
    if (!this.state.loaded) {
      return <Loading />
    }
    return (
      <View className='invite-list'>
        <ScrollView
          scrollY
          className='invite-list__wrap'
          onScrollToLower={this.loadInviteList}
          style={{ height: getWindowHeight() }}
        >
        {(!this.state.loading && (this.state.inviteList.length == 0)) && <View className='invite-list__center'>还没有邀请信息</View>}
        {this.state.inviteList.map((item) => {
          return (
            <View
              className='invite-list__item'
              key={item.id}
            >
              <Image
              className='invite-list__item-avatar'
              src={item.headimgurl || defaultAvatar}
              />
              <View
                className='invite-list__item-title'
              >
                <Text className='invite-list__item-title-h3'>{item.nickname}</Text>
                <Text className='invite-list__item-title-p'>绑定时间：</Text>
              </View>
              <View
                className='invite-list__item-content'
              >
                <Text className='invite-list__item-content-h3c'>未下单</Text>
                <Text className='invite-list__item-content-pc'>{item.create_time}</Text>
              </View>
            </View>
          )
        })}
        {this.state.loading &&
          <View className='invite-list__loading'>
            <Text className='invite-list__loading-txt'>正在加载中...</Text>
          </View>
        }
        {!this.state.hasMore &&
          <View className='invite-list__loading invite-list__loading--not-more'>
            <Text className='invite-list__loading-txt'>没有更多了</Text>
          </View>
        }
        </ScrollView>
      </View>
    )
  }
}

export default InviteList
