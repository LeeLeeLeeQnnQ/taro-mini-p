import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView , Image , Button , Input } from '@tarojs/components'
import { getWindowHeight } from '@utils/style'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/join'
import PickImg from './pick-img'
import TitleDec from './title-dec'
import './join.scss'

@connect(state => state.join, { ...actions})
class Join extends Component {
  config = {
    navigationBarTitleText: '我要报名'
  }

  constructor(props) {
    super(props)
    this.state = {
      shop_image:'',
      order_image:'',
      comment_image:'',
      order_sn:'',
      loaded: false,
      loading: false,
      pindex:0,
    }
  }
  
  componentDidMount() {
    // 获取主页数据函数
    this.props.dispatchShopList().then(() => {
      this.setState({ loaded: true })
    })
  }

  createOrder = () => {
    if(!this.state.shopList[this.state.pindex].id){
      Taro.showToast({
        title: '请选择有效店铺',
        icon: 'none',
        duration: 3000
      })
      return
    }
    if(!this.state.order_sn){
      Taro.showToast({
        title: '请输入有效订单号',
        icon: 'none',
        duration: 3000
      })
      return
    }
    if(!this.state.comment_image){
      Taro.showToast({
        title: '请上传评价截图',
        icon: 'none',
        duration: 3000
      })
      return
    }
    if(!this.state.shop_image){
      Taro.showToast({
        title: '请上传订单截图',
        icon: 'none',
        duration: 3000
      })
      return
    }
    if(!this.state.order_image){
      Taro.showToast({
        title: '请上传订单截图',
        icon: 'none',
        duration: 3000
      })
      return
    }
    const payload = {
      shop_id:this.state.shopList[this.state.pindex].id,
      order_sn:this.state.order_sn,
      comment_image:this.state.comment_image,
      shop_image:this.state.shop_image,
      order_image:this.state.order_image,
    }
    this.props.dispatchCreateOrder(payload).then((res) => {
      if(res.data.code != 0){
        Taro.showToast({
          title: '请求失败,请稍后再试!',
          icon: 'none',
          duration: 6000
        })
        return
      }
      Taro.showModal({
        title: '报名成功！',
        content: '请关注‘北京福利社公众号’以免红包发送失败',
        showCancel:false,
      })
      .then(res => 
        Taro.switchTab({
          url: `/pages/home/home`
        })
      )})
  }

  onChange = e => {
    this.setState({
      pindex: e.detail.value,
    })
  }

  onInputChange = e => {
    this.setState({
      order_sn: e.detail.value,
    })
  }

  onChangeShopImage = (url) => {
    this.setState({
      shop_image: url ,
    })
  }

  onChangeOrderImage = (url) => {
    this.setState({
      order_image: url ,
    })
  }

  onChangeCommentImage = (url) => {
    this.setState({
      comment_image: url ,
    })
  }
  // 提交的时候定时器延迟

  render () {
    if (!this.state.loaded) {
      return <Loading />
    }
    // 数据
    const height = getWindowHeight(false)
    const xuanzemendian = { title : "选择门店" , dec : "请认真选择，选择错误将不予返现" } 
    const dingdanjietu1 = { title : "上传订单截图" , dec : "显示出商家名称，订单商品，金额" } 
    const pingjiejietu = { title : "上传评价截图" , dec : "显示出商家名称，订单商品，金额" } 
    const dingdanjietu2 = { title : "上传订单截图" , dec : "显示出订单时间，订单号" } 
    const dingdanhao = { title : "订单号" , dec : "订单号可从美团/饿了么复制或手动输入" }
    const guize = { dec : "自助返现规则说明：" , dec2 : "请在下单当天提交，超时无效不予返现。" } 
    const { shopList } = this.props
    return (
      <View className='join'>
        <ScrollView
          scrollY
          style={{ height }}
          className='join__wrap'
        >
          <View className='join__wrap-title'>
            <View className='join__wrap-title-h3'>自助返现</View>
            <View className='join__wrap-title-p'>返现金额不大于实付金额</View>
          </View>
          <TitleDec
            data={ xuanzemendian } 
          />
          <View className='join__wrap-sbox'>
            <View className='join__wrap-sbox-section'>
              { (shopList.length > 0) && <Picker mode='selector' value={ this.state.pindex } range={ shopList } range-key={ 'shop_title' } onChange={this.onChange}>
                <view className='join__wrap-sbox-section-picker'>
                  {shopList[this.state.pindex].shop_title}
                </view>
              </Picker>}
            </View>
          </View>
          <TitleDec
            data={ dingdanhao } 
          />
          <View className='join__wrap-ibx'>
            <Input className='join__wrap-ibx-input' onChange={this.onInputChange}  type='text'/>
          </View>
          <TitleDec
            data={ dingdanjietu1 } 
          />
          <PickImg
            url = { this.state.shop_image }
            onImgChange = {this.onChangeShopImage}
          />

          <TitleDec
            data={ dingdanjietu2 } 
          />
          <PickImg
            url = { this.state.order_image }
            onImgChange = {this.onChangeOrderImage}
          />

          <TitleDec
            data={ pingjiejietu } 
          />
          <PickImg
            url = { this.state.comment_image }
            onImgChange = {this.onChangeCommentImage}
          />
          
          <TitleDec
            data={ guize } 
          />
          <View className='join__footer'>
            <Button className='join__footer-btn' onClick={this.createOrder}>我要报名</Button>
          </View>
          <official-account></official-account>
        </ScrollView>
      </View>
    )
  }
}

export default Join
