import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView , Image , Button , Input } from '@tarojs/components'
import { getWindowHeight } from '@utils/style'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/apply'
import PickImg from './pick-img'
import TitleDec from './title-dec'
import './apply.scss'
import { Loading } from '@components'
import { setLocal , getLocal , updateLocalCity } from '@utils/local'



@connect(state => state.apply, { ...actions})

class Apply extends Component {
  config = {
    navigationBarTitleText: '报名'
  }

  constructor(props) {
    super(props)
    this.state = {
    	// 控制
      btnLoading1:false,
      btnLoading2:false,
      // shopList
      shopList:[],
      pindex:0,
      // 信息
      order_sn:'',
      showInfo:{},
      comment_image:'',
      isShowInfo:false,
      isInfoEmpty:true,
      refresh:0,
    }
  }
  // 获取存储的数据
  getStorage = (key) => {
    return Taro.getStorage({ key: key }).then(res => { return res.data}).catch(() => '')
  }
  // 判断登录状态
  handlePreSreach = () => {
    let _this = this;
    this.getStorage('token').then(function (rs) {
        setTimeout(()=>{
          if(!!rs){
            _this.props.dispatchShopList().then((res) => {
              _this.setState({ shopList: res })
              _this.handleSreach(_this.state.order_sn);
            })
            return
          }else{
            _this.wxLogin()
            return
          }
        },0)
    });
    // getLocal().then((id)=>{
    //   if(!id){
    //     setLocal();
    //   }else{
    //     this.setState({ lkey: 0 }, ()=> {
          
    //     })
    //   }
    //   return
    // })
  }
  // 查询操作
  handleSreach = (order_sn) => {
    if(!order_sn){
      Taro.showToast({
        title: '请输入订单号！',
        icon: 'none'
      })
      return
    }
    const payload = {
      order_sn:order_sn,
    }
    this.props.dispatchShowInfo(payload).then((res) => {
      this.setState({
        isShowInfo: true,
        showInfo:{},
      })
      let data = res
      if(!data || !data.order || !data.order.store_id){
        this.setState({
          isInfoEmpty: false,
        })
      }else{
        this.setState({
          showInfo: data.order,
          isInfoEmpty: true,
        })
      }
    }).catch(() => {
      this.setState({
        btnLoading1: false,
      })
    })
  }
  // H
  wxLogin = () => {
  	let _this = this;
    wx.login({
    success: res => {
      var code = res.code;
      if (code){
          wx.request({
            url: 'https://wechat.baitime.cn/mini/User/info',
            data: { code: code },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if(res.data.code == 0) {
                Taro.setStorage({ key: 'token', data: res.data.data['token'] || '' })
                setTimeout(function(){
                  _this.handlePreSreach();
                },200)
              }else if (res.data.code == 20) {
                Taro.showToast({
                  title: '请稍后再试！',
                  icon: 'none'
                })
              }else if (res.data.code == 2148) {
                Taro.showModal({
                  title: '请先登陆！',
                  content: '',
                  showCancel:false,
                })
                .then(res => 
                  Taro.switchTab({
                    url: `/pages/new-user/user`
                  })
                )
              }else{
                Taro.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
            },
          })
        } else {
          Taro.showToast({
            title: '没有网络了！',
            icon: 'none'
          })
          return
        }
      }
    })
  }

  onInputChange = e => {
    this.setState({
      order_sn: e.detail.value,
    })
  }
  // 有订单号提交
  onChangeCommentImage = (url) => {
    this.setState({
      comment_image: url ,
    })
  }

  createOrder = () => {
    if(!!this.state.btnLoading2){
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
    const payload = {
      shop_id:this.state.showInfo.shop_id,
      order_sn:this.state.showInfo.order_sn,
      comment_image:this.state.comment_image,
      isGetinfo:true,
    }
    this.props.dispatchApplyOrder(payload).then((res) => {
      this.setState({
          // 控制
        btnLoading1:false,
        btnLoading2:false,
        // shopList
        shopList:[],
        pindex:0,
        // 信息
        order_sn:'',
        showInfo:{},
        shop_image:'',
        order_image:'',
        comment_image:'',
        isShowInfo:false,
        isInfoEmpty:true,
        showInfo:{},
      })
      Taro.showModal({
        title: '报名成功！',
        content: '请关注‘'+res.wechat,
        showCancel:false,
      })
      .then(res => 
        Taro.switchTab({
          url: `/pages/home/home`
        })
    )}).catch(() => {
      this.setState({
        btnLoading2: false,
      })
    })
  }

  getShopList = () =>{
  }

  //无订单号提交
  onChange = e => {
    this.setState({
      pindex: e.detail.value,
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

  onChangeCommentImage2 = (url) => {
    this.setState({
      comment_image: url ,
    })
  }

  createOrder2 = () => {
    if(!!this.state.btnLoading2){
      return
    }
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
      isGetinfo:true,
    }
    this.props.dispatchApplyOrder(payload).then((res) => {
      this.setState({
          // 控制
        btnLoading1:false,
        btnLoading2:false,
        // shopList
        shopList:[],
        pindex:0,
        // 信息
        order_sn:'',
        showInfo:{},
        shop_image:'',
        order_image:'',
        comment_image:'',
        isShowInfo:false,
        isInfoEmpty:true,
        showInfo:{},
      })
      Taro.showModal({
        title: '报名成功！',
        content: '请关注‘'+res.wechat+'’，查看返现进度',
        showCancel:false,
      })
      .then(res => 
        Taro.switchTab({
          url: `/pages/home/home`
        })
    )}).catch(() => {
      this.setState({
        btnLoading: false,
      })
    })
  }
  
  componentDidShow(){
    getLocal().then((id)=>{
      if(!id){
        updateLocalCity()
      }
    })
  }

  componentDidMount() {
  }
  // 提交的时候定时器延迟

  render () {
    const height = getWindowHeight(false)
    const xuanzemendian = {
      title : "选择店铺" ,
      dec : "请点击选择下单店铺，选择错误将不予返现" ,
      ctRed:true 
    } 
    const dingdanhao = { 
      title : "订单号" , 
      dec : "从美团／饿了么APP复制" , 
      isHasImg:true , 
      exampleImg : "http://ocs-attachment.oss-cn-qingdao.aliyuncs.com/e1.jpg" 
    }
    const dingdanjietu1 = {
      title : "上传商家截图" ,
      dec : "包含：商家名称、支付金额" ,
      isHasImg:true ,
      exampleImg : "http://ocs-attachment.oss-cn-qingdao.aliyuncs.com/e3.jpg" 
    } 
    const pingjiejietu = {
      title : "上传评价截图" ,
      dec : "包含：商家名称、文字评语、好评图片" ,
      isHasImg:true ,
      exampleImg : "http://ocs-attachment.oss-cn-qingdao.aliyuncs.com/e2.jpg" 
    } 
    const dingdanjietu2 = { 
      title : "上传时间截图" , 
      dec : "包含：订单号码、下单时间" , 
      isHasImg:true , 
      exampleImg : "http://ocs-attachment.oss-cn-qingdao.aliyuncs.com/e4.jpg" 
    } 
    const guize = { 
      dec : "自助返现规则说明：" , 
      dec2 : "每人每天每店限1单", 
      dec3 : "每单限1份返利商品", 
      dec4 : "返现24小时内审核发放", 
      dec5 : "如有疑问可咨询微信公众号平台"
    } 
    return (
      <View className='apply'>
        <ScrollView
          scrollY
          style={{ height }}
          className='apply__wrap'
        >
          <TitleDec
            data={ dingdanhao } 
          />
          <View className='apply__wrap-ibx'>
            <Input className='apply__wrap-ibx-input' value={this.state.order_sn}  onChange={this.onInputChange}  type='text'/>
          </View>
          <TitleDec
            data={ guize } 
          />
          <View className='apply__btnbox'>
            <Button className='apply__btnbox-btn' loading = { this.state.btnLoading1 } onClick={this.handlePreSreach}>我要报名</Button>
          </View>
          <View className='apply__line'></View>
          {!!isShowInfo &&
          <View className='apply__infobox'>
            {(!isInfoEmpty) &&
    	        <View>
                  <TitleDec
                    data={ xuanzemendian } 
                  />
                  <View className='apply__wrap-sbox'>
                    <View className='apply__wrap-sbox-section'>
                      { (this.state.shopList.length > 0) && <Picker mode='selector' value={ this.state.pindex } range={ this.state.shopList } range-key={ 'shop_title' } onChange={this.onChange}>
                        <view className='apply__wrap-sbox-section-picker'>
                          {this.state.shopList[this.state.pindex].shop_title}
                        </view>
                      </Picker>}
                    </View>
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
                    onImgChange = {this.onChangeCommentImage2}
                  />
                  <TitleDec
                    data={ guize } 
                  />
                  <View className='apply__submitbtn'>
                    <Button className='apply__submitbtn-btn' loading = { this.state.btnLoading2 } onClick={this.createOrder2}>提交</Button>
                  </View>
              </View>
            }
            {(!!isInfoEmpty) &&
            <View>
    	          <View className='apply__infobox-warning'>
    	          	请您上传评价截图后点击最下方提交按钮！
    	          </View>
              	<View className='apply__infobox-title'>
    	            <View className='apply__infobox-title-h3'>店铺名称</View>
    	            <View className='apply__infobox-title-p'>{ this.state.showInfo.shop_name }</View>
    	          </View>
    	          <View className='apply__infobox-title'>
    	            <View className='apply__infobox-title-h3'>订单时间</View>
    	            <View className='apply__infobox-title-p'>{ this.state.showInfo.order_time }</View>
    	          </View>
    	          <View className='apply__infobox-title'>
    	            <View className='apply__infobox-title-h3'>实际支付金额</View>
    	            <View className='apply__infobox-title-p'>{ this.state.showInfo.order_total }元</View>
    	          </View>
    	          <View className='apply__infobox-pjjt'>
    	            <TitleDec
    		            data={ pingjiejietu } 
    		          />
    		          <PickImg
    		            url = { this.state.comment_image }
    		            onImgChange = {this.onChangeCommentImage}
    		          />
    	          </View>
    	          <View className='apply__submitbtn'>
    	            <Button className='apply__submitbtn-btn' loading = { this.state.btnLoading2 } onClick={this.createOrder}>提交</Button>
    	          </View>
            </View>
            }
          </View>
          }
        </ScrollView>
      </View>
    )
  }
}

export default Apply
