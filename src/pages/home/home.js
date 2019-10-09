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
import { getWindowHeight  } from '@utils/style'
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

import { setLocal , getLocal , updateLocalCity } from '@utils/local'


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

  componentDidShow(){
    getLocal().then((id)=>{
      if(!id){
        updateLocalCity()
      }else{
        if(!!id && this.props.spreadList.length == 0){
          this.loadSpread()
        }
      }
    })
  }

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
    // Taro.switchTab({
    //   url: `/pages/book/book`
    // })
    // jump({ title:'自助返现' , url: 'https://wechat.baitime.cn/wechat/Wx/cb' })
     wx.request({
      url: 'http://wechat.baitime.cn/index/index/rt',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let data = res.data.data;
        // console.log(data)
        let obj = {
          timeStamp: data.timeStamp, // 支付签名时间戳，
          nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
          package: data.package, //扩展字段，由商户传入
          signType: data.signType, // 签名方式，
          paySign: data.paySign,
        }
        console.log(obj)
        wx.sendBizRedPacket({
            timeStamp: data.timeStamp, // 支付签名时间戳，
            nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
            package: data.package, //扩展字段，由商户传入
            signType: data.signType, // 签名方式，
            paySign: data.paySign, // 支付签名
            success:(res)=>{
              console.log('0')
              console.log(res)
            },
            fail:(res)=>{
              console.log('1')
              console.log(res)
            },
            complete:(res)=>{
              console.log('2')
              console.log(res)
            }
        })
        // if(res.data.code == 0) {
          
        // }else if (res.data.code == 20) {
        //   Taro.showToast({
        //     title: '请稍后再试！',
        //     icon: 'none'
        //   })
        // }else if (res.data.code == 2148) {
        //   Taro.showModal({
        //     title: '请先登陆！',
        //     content: '',
        //     showCancel:false,
        //   })
        //   .then(res => 
        //     Taro.switchTab({
        //       url: `/pages/new-user/user`
        //     })
        //   )
        // }else{
        //   Taro.showToast({
        //     title: res.msg,
        //     icon: 'none'
        //   })
        // }
      },
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
