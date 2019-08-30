import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView , Image , Button , Input } from '@tarojs/components'
import { getWindowHeight } from '@utils/style'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/apply'
import PickImg from './pick-img'
import TitleDec from './title-dec'
import './apply.scss'



@connect(state => state.apply, { ...actions})

class Apply extends Component {
  config = {
    navigationBarTitleText: '报名'
  }

  constructor(props) {
    super(props)
    this.state = {
    	// 控制
      loaded: false,
      loading: false,
      btnLoading1:false,
      btnLoading2:false,
      // 信息
      order_sn:'',
      showInfo:{},
      comment_image:'',
      isShowInfo:false,
      isInfoEmpty:true,
    }
  }

  // 获取存储的数据
  getStorage = (key) => {
    return Taro.getStorage({ key: key }).then(res => { return res.data}).catch(() => '')
  }
  // 判断登录状态
  handlePreSreach = () => {
    let _this = this;
    this.setState({ lkey: 0 }, ()=> {
      this.getStorage('token').then(function (rs) {
          if(!!rs){
            _this.handleSreach(_this.state.order_sn);
            return
          }
          _this.wxLogin()
      });
    })
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
        })
        this.setState({
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
            url: 'https://wechat.baitime.cn/wechat/User/info',
            data: { code: code },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if(res.data.code == 0) {
                Taro.setStorage({ key: 'token', data: res.data.data['token'] || '' })
                _this.handleSreach(_this.state.order_sn);
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
          if(this.state.lkey == 5){
            Taro.showToast({
              title: '网络错误！',
              icon: 'none'
            })
            return
          }
          let lkey = this.state.lkey*1 + 1;
          this.setState( { lkey: lkey }, ()=> {
            this.wxLogin()
          })
        }
      }
    })
  }

  onInputChange = e => {
    this.setState({
      order_sn: e.detail.value,
    })
  }

  onChangeCommentImage = (url) => {
    this.setState({
      comment_image: url ,
    })
  }

  createOrder = () => {
    if(!!this.state.btnLoading){
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
      store_id:this.state.showInfo.store_id,
      order_sn:this.state.showInfo.order_sn,
      comment_image:this.state.comment_image,
      isGetinfo:true,
    }
    this.setState({
      btnLoading: true,
    })
    this.props.dispatchApplyOrder(payload).then((res) => {
      this.setState({
        btnLoading: false,
      })
      if(res.data.code != 0){
        Taro.showToast({
          title: '请求失败,请稍后再试!',
          icon: 'none',
          duration: 6000
        })
        return
      }
      
      this.setState({
        btnLoading: false,
        isShowInfo:false,
        comment_image:'',
        order_sn:'',
      })
      Taro.showModal({
        title: '报名成功！',
        content: '请关注‘北京福利社公众号’以免红包发送失败',
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
  
  componentDidMount() {
    
  }
  // 提交的时候定时器延迟

  render () {
    const height = getWindowHeight(false)
    const dingdanhao = { 
      title : "订单号" , 
      dec : "从美团／饿了么APP复制" , 
      isHasImg:true , 
      exampleImg : "http://ocs-attachment.oss-cn-qingdao.aliyuncs.com/e1.jpg" 
    }
    const pingjiejietu = {
      title : "上传评价截图" ,
      dec : "包含：商家名称、文字评语、好评图片" ,
      isHasImg:true ,
      exampleImg : "http://ocs-attachment.oss-cn-qingdao.aliyuncs.com/e2.jpg" 
    }
    const guize = { 
      dec : "自助返现规则说明：" , 
      dec2 : "每人每天每店限1单", 
      dec3 : "每单限1份返利商品", 
      dec4 : "返现24小时内审核发放", 
      dec5 : "如有疑问可咨询微信：hys18610653576"
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
  	          <View className='apply__infobox-warning'>
  	          	未查询到您的订单信息，请核实订单号是否有误；如无误请及时联系客服处理。
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
