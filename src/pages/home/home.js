import Taro, { Component } from '@tarojs/taro'
// 获取UI
import { View, Text, Image, ScrollView } from '@tarojs/components'
// 获取loading
import { Loading , Tag} from '@components'
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

import { setLocal , getLocal , updateCity } from '@utils/local'



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
    id:'',
  }
  componentWillMount(){
    this.initPage();
  }

  componentDidShow(){
    
  }

  // 已经挂载数据生命周期函数
  componentDidMount() {
    // 获取主页数据函数
    this.props.dispatchBanner().then(() => {
      this.setState({ loaded: true })
    })
  }

  initPage(){
    this.setState({ spreadList: [] , page: 1,})
    let that = this
    getLocal().then((id)=>{
      this.setState({ id: id})
      that.loadSpread()
    })
    // getLocal().then((id)=>{
    //   if(!id){
    //     Taro.getLocation().then((res)=>{
    //       let dot  = res
    //       if(res.errMsg == "getLocation:ok"){
    //         wx.request({
    //           url: 'https://wechat.baitime.cn/mini/index/getCity',
    //           data: res,
    //           method: 'POST',
    //           header: {
    //             'content-type': 'application/json'
    //           },
    //           success: function (res) {
    //             let data = res.data
    //             if(data.code == 0){
    //               updateCity({cityId:data.data.id,latitude:dot.latitude,longitude:dot.longitude})
    //               that.loadSpread()
    //             }else{
    //               updateCity({})
    //             }
    //             return
    //           }
    //         })
    //       }else{
    //         that.loadSpread()
    //         Taro.showModal({
    //           title: '欢迎来到外卖美食社',
    //           content: '为更好的为您服务，需获得您的授权',
    //           showCancel:false,
    //         })
    //         .then(res => {
    //           Taro.navigateTo({
    //             url: `/pages/location/location`
    //           })
    //         })
    //       }
    //     }).catch((err) => {
    //       Taro.showModal({
    //         title: '欢迎来到外卖美食社',
    //         content: '为更好的为您服务，需获得您的授权',
    //         showCancel:false,
    //       })
    //       .then(res => {
    //         Taro.navigateTo({
    //           url: `/pages/location/location`
    //         })
    //       })
    //     })
    //   }
    //   if(!!id){
    //     Taro.getLocation().then((res)=>{
    //       let dot  = res
    //       if(res.errMsg == "getLocation:ok"){
    //         Taro.setStorage({ key: 'latitude', data: dot.latitude || '' })
    //         Taro.setStorage({ key: 'longitude', data: dot.longitude || '' })
    //       }
    //     }).then(()=>{
    //       this.loadSpread()
    //     })
    //   }
    // })
  }

  reloadPage(){
    let that = this;
    Taro.getLocation().then((res)=>{
      let dot  = res
      if(res.errMsg == "getLocation:ok"){
        wx.request({
          url: 'https://wechat.baitime.cn/mini/index/getCity',
          data: res,
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            let data = res.data
            if(data.code == 0){
              updateCity({cityId:data.data.id,latitude:dot.latitude,longitude:dot.longitude})
              that.initPage()
            }
          },
        })
      }else{
        Taro.showModal({
          title: '欢迎来到外卖美食社',
          content: '为更好的为您服务，需获得您的授权',
          showCancel:false,
        })
        .then(res => {
          Taro.navigateTo({
            url: `/pages/location/location`
          })
        })
      }
    }).catch((err) => {
      Taro.showModal({
        title: '欢迎来到外卖美食社',
        content: '为更好的为您服务，需获得您的授权',
        showCancel:false,
      })
      .then(res => {
        Taro.navigateTo({
          url: `/pages/location/location`
        })
      })
    })
  }



  handleBook = () => {
    Taro.switchTab({
      url: `/pages/apply/apply`
    })
  }

  handleClick = (item) => {
    if(item.shop_state == 2){
      Taro.showToast({
        title: '活动筹备中,敬请期待！',
        icon: 'none',
        duration: 6000
      })
      return
    }
    Taro.navigateTo({
      url: `/pages/store-item/store-item?itemId=${item.id}`
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
    const list  = this.state.spreadList
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


          <View className='home-spread'>
            <View className='home-spread__list'>
              <View className='home-spread__title'>
                <Text className='home-spread__title-txt'>今日推荐</Text>
              </View>
              {!this.state.id && <View 
                className='home-spread__refresh'
                onClick={this.reloadPage}>
                地理位置获取错误？点我重新加载！
              </View>}
              {list.map((item) => {
                const { id,
                        shop_name,
                        shop_logo,
                        area_id,
                        area_name,
                        category,
                        activities,
                        rules,
                        tags,
                        shop_state,
                        ele_qrcode,
                        meituan_qrcode,
                        distance} = item
                let dis_th = (distance*1).toFixed(0)/1000
                let distance_text = dis_th >= 1 ? dis_th.toFixed(2)+'km' : (distance*1).toFixed(0) + 'm';
                let area_class = 'home-spread__list-item-left-area-'+area_id;
                let tag_list =!!tags?[ category ].concat(tags.split(',')) : [ category ];
                return (
                  <View
                    key={id}
                    className='home-spread__list-item'
                    onClick={this.handleClick.bind(this, item)}>
                    <View
                      className='home-spread__list-item-left'>
                      <View className='home-spread__list-item-left-ibx'>
                        <Image className='home-spread__list-item-left-ibx-img' src={shop_logo} />
                        { !!(shop_state == 2) && <View className='home-spread__list-item-left-ibx-warp'>敬请期待</View> }
                      </View>
                      <View className='home-spread__list-item-left-area'>
                        <Text className={area_class}>{area_name}</Text>
                      </View>
                    </View>
                    <View
                     className='home-spread__list-item-right'
                    >
                      <Text className='home-spread__list-item-right-title'>{shop_name}</Text>
                      <Text className='home-spread__list-item-right-activities'>{activities}</Text>
                      <View className='home-spread__list-item-right-tag'>
                        {tag_list.map((t_item,index) => {
                          return (<Text key={index} className='home-spread__list-item-right-tag-item'>{t_item}</Text>)
                        })}
                        <Text key={index} className='home-spread__list-item-right-tag-distance'>
                          {distance_text}
                        </Text>
                      </View>
                      <Text className='home-spread__list-item-right-rules'>
                        {rules}
                      </Text>
                    </View>
                    <View
                     className='home-spread__list-item-fixed'
                    >
                      { !!ele_qrcode && <Text className='home-spread__list-item-fixed-title'>饿了么</Text> }
                      { !!meituan_qrcode && <Text className='home-spread__list-item-fixed-title'>美团</Text> }
                    </View>
                  </View>
                )
              })}
            </View>
          </View>

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
