import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView , Image , Button} from '@tarojs/components'
import { getWindowHeight } from '@utils/style'
import bookImg from './assets/bookImg.jpg';
// import * as actions from '@actions/user'
// import { connect } from '@tarojs/redux'／
import './book.scss'


class Book extends Component {
  config = {
    navigationBarTitleText: '报名参加'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      lkey:0
    }
  }

  getStorage = (key) => {
       return Taro.getStorage({ key: key }).then(res => { return res.data}).catch(() => '')
  }
  
  componentDidMount() {
    this.setState({ loaded: true })
  }



  handleJoin = () => {
    let _this = this;
    this.setState({ lkey: 0 }, ()=> {
      this.getStorage('token').then(function (rs) {
          if(!!rs){
            Taro.navigateTo({
              url: `/pages/join/join`
            })
            return
          }
          _this.wxLogin()
      });
    })
  }


  wxLogin = () => {
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
                Taro.navigateTo({
                  url: `/pages/join/join`
                })
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



  render () {
    if (!this.state.loaded) {
      return <Loading />
    }

    // 数据
    const height = getWindowHeight(false)

    return (
      <View className='book' style={{ height }}>
        <ScrollView
          className='book__wrap'
        >
           <Image className='book__wrap-img' mode='widthFix' src={bookImg} />
        </ScrollView>
        <View className='book__footer'>
          <Button className='book__footer-btn'  onClick={this.handleJoin}>我要报名</Button>
        </View>
      </View>
    )
  }
}

export default Book
