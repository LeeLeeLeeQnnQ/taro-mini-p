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
      <View className='img-view'>
        <Image
          className='img-view__img'
          src={data}
          mode = 'widthFix'
        />
      </View>
    )
  }
}
