import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import defaultImg from '@assets/default-img.jpg'

export default class ImgView extends Component {
  static defaultProps = {
    data: defaultImg
  }

  render () {
    const { data } = this.props
    return (
      <View className='user-profile'>
        <Image
          className='info-detail__wrap-body-bm-main-cimg'
          src={data}
          mode = 'widthFix'
        />
      </View>
    )
  }
}
