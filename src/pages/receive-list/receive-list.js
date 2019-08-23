import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getWindowHeight } from '@utils/style'
import defaultAvatar from '@assets/default-avatar.png'
import * as actions from '@actions/info'
import './receive-list.scss'


const INFO_SIZE = 20
@connect(state => state.info, { ...actions})
class ReceiveList extends Component {
  config = {
    navigationBarTitleText: '活动列表'
  }

  state = {
    loaded: false,
    loading: false,
    page: 1,
    hasMore: true,
    receiveList:[],
  }

  componentWillMount(){
    
  }

  // 已经挂载数据生命周期函数
  componentDidMount() {
    this.setState({ loaded: true })
    // 获取传播列表函数
    this.loadReceiveList()
  }

  loadReceiveList = () => {
    if (!this.state.hasMore || this.state.loading) {
      return
    }
    const payload = {
      page: this.state.page,
      page_size: INFO_SIZE,
      isGetinfo: true,
      type:2
    }
    this.setState({ loading: true })
    this.props.dispatchInviteList(payload).then((res) => {   
      const list = this.state.receiveList.concat(res.list);
      const page = res.page;
      this.setState({ receiveList: list })
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
      <View className='receive-list'>
        <ScrollView
          scrollY
          className='receive-list__wrap'
          onScrollToLower={this.loadReceiveList}
          style={{ height: getWindowHeight() }}
        >
        {(!this.state.loading && (this.state.receiveList.length == 0)) && <View className='receive-list__center'>还没有好友下单</View>}
        {this.state.receiveList.map((item) => {
          return (
            <View
              className='receive-list__item'
              key={item.id}
            >
              <Image
              className='receive-list__item-avatar'
              src={item.headimgurl || defaultAvatar}
              />
              <View
                className='receive-list__item-title'
              >
                <Text className='receive-list__item-title-h3'>{item.nickname}</Text>
                <Text className='receive-list__item-title-p'>绑定时间：</Text>
              </View>
              <View
                className='receive-list__item-content'
              >
                <Text className='receive-list__item-content-h3c'>已下单</Text>
                <Text className='receive-list__item-content-pc'>{item.create_time}</Text>
              </View>
            </View>
          )
        })}
        {this.state.loading &&
          <View className='receive-list__loading'>
            <Text className='receive-list__loading-txt'>正在加载中...</Text>
          </View>
        }
        {!this.state.hasMore &&
          <View className='receive-list__loading receive-list__loading--not-more'>
            <Text className='receive-list__loading-txt'>没有更多了</Text>
          </View>
        }
        </ScrollView>
      </View>
    )
  }
}

export default ReceiveList
