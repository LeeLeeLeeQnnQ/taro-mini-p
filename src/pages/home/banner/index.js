import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
// 跳转
import jump from '@utils/jump'

export default class SwiperBanner extends Component {
  static defaultProps = {
    list: []
  }

  handleClick = (url) => {
    jump({ title:'参与方式' , url: url })
  }

  render () {
    const { list } = this.props
    return (
      <View className='home-banner'>
        <Swiper
          className='home-banner__swiper'
          circular
          autoplay
          indicatorDots
          indicatorActiveColor='rgb(178, 42, 49)'
        >
          {list.map(item => (
            <SwiperItem
              key={item.id}
              className='home-banner__swiper-item'
              onClick={this.handleClick.bind(this, item.url)}
            >
              <Image
                className='home-banner__swiper-item-img'
                src={item.image}
              />
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    )
  }
}
