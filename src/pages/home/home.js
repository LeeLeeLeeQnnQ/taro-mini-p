import Taro, { Component } from '@tarojs/taro'
// 获取UI
import { View, Text, Image, ScrollView } from '@tarojs/components'
// 获取loading
import { Loading } from '@components'
// 获取接口连接

import { connect } from '@tarojs/redux'
// 获取借口方法
import * as actions from '@actions/home'
// 设备宽获样式方法
import { getWindowHeight } from '@utils/style'
// 头部广告位组件
import Banner from './banner'
// 商户传播列表组件
import SpreadList from './spread-list'
// 获取样式
import './home.scss'

import iconSend from './assets/icon_send.png';
import shareImg from './assets/share.png';

// 分享
import withShare from '../../share/withShare'


const SPREAD_SIZE = 10

// 注入连接请求方法
@connect(state => state.home, { ...actions})
@withShare({
    title: '', 
    imageUrl: shareImg,
    iconSend: iconSend,
    path: ''
})

// 组件
class Home extends Component {
  // 小程序文字配置
  config = {
    navigationBarTitleText: '外卖美食社'
  }
  // loading与刷新状态
  state = {
    loaded: false,
    loading: false,
    page: 1,
    hasMore: true,
    spreadList:[],
  }
  componentWillMount(){

  }

  // $setSharePath = () =>{
  //   let pages = getCurrentPages();
  //   let currPage = null;
  //   if (pages.length) {
  //      currPage = pages[pages.length - 1];
  //   }
  //   let page = !!currPage.route ? currPage.route : '';
  //   const path = page +'?token='+ wx.getStorageSync('token');
  //   return path
  // }

  // 已经挂载数据生命周期函数
  componentDidMount() {
    // 获取主页数据函数
    this.props.dispatchBanner().then(() => {
      this.setState({ loaded: true })
    })
    // 获取传播列表函数
    this.loadSpread()
  }
  
  handleBook = () => {
    Taro.switchTab({
      url: `/pages/apply/apply`
    })
  }

  

  // 获取传播列表函数
  loadSpread = () => {
    if (!this.state.hasMore || this.state.loading) {
      return
    }
    const payload = {
      page: this.state.page,
      page_size: SPREAD_SIZE
    }
    this.setState({ loading: true })
    this.props.dispatchSpread(payload).then((res) => {
      const list = this.state.spreadList.concat(res.list);
      const page = res.page;
      this.setState({ spreadList: list })
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

    const { bannerList } = this.props
    return (
      <View className='home'>
        <View className='home__arrow-box' onClick={this.handleBook}>
          <Image className='home__arrow-box-icon' mode='widthFix' src={iconSend} />
          <View className='home__arrow-box-text'>自助返现</View>
        </View>
        <ScrollView
          scrollY
          className='home__wrap'
          onScrollToLower={this.loadSpread}
          style={{ height: getWindowHeight() }}
        >
          <Banner list={bannerList} />
          <SpreadList list={ this.state.spreadList } />

          {this.state.loading &&
            <View className='home__loading'>
              <Text className='home__loading-txt'>正在加载中...</Text>
            </View>
          }
          {!this.state.hasMore &&
            <View className='home__loading home__loading--not-more'>
              <Text className='home__loading-txt'>更多内容，敬请期待</Text>
            </View>
          }
        </ScrollView>
      </View>
    )
  }
}

export default Home
