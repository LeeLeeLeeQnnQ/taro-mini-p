import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView , Image , Button} from '@tarojs/components'
import { getWindowHeight } from '@utils/style'
import './location.scss'
import { updateLocalCity } from '@utils/local'

class Location extends Component {
  config = {
    navigationBarTitleText: '地理位置'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
  }

  componentWillMount(){
    
  }


  componentDidShow(){
    wx.getSetting({
      success (res) {
        if(res.authSetting['scope.userLocation']){
          updateLocalCity()
        }
      }
    })
  }



  render () {
    // 数据
    const height = getWindowHeight(false)

    return (
      <View className='location' style={{ height }}>
        <ScrollView
          className='location__wrap'
        >
          <button className='location__wrap-btn' open-type="openSetting" bindopensetting="openSetting">打开设置页</button>
        </ScrollView>
      </View>
    )
  }
}

export default Location
