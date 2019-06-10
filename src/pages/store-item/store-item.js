import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/item'
import { getWindowHeight } from '@utils/style'
import Footer from './footer'
import './store-item.scss'

@connect(state => state.item, { ...actions })

class StoreItem extends Component {
  config = {
    navigationBarTitleText: '店铺详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
    this.itemId = parseInt(this.$router.params.itemId)
  }

  componentDidMount() {
    const payload = {
      id: this.itemId,
    }
    this.props.dispatchItem(payload).then(() => {
      this.setState({ loaded: true })
    })
  }


  render () {
    const { itemInfo } = this.props
    const height = getWindowHeight(false)
    if (!this.state.loaded) {
      return <Loading />
    }
    return (
      <View className='item'>
        <ScrollView
          scrollY
          className='item__wrap'
          style={{ height }}
        >
          <View className='item__wrap-top'>
            <View className='item__wrap-top-left'>
              <Image className='item__wrap-top-left-logo' src={itemInfo.shop_logo} />
            </View>
            <View className='item__wrap-top-right'>
              <Text className='item__wrap-top-right-title'>{itemInfo.shop_name}</Text>
              <Text className='item__wrap-top-right-area'>{itemInfo.area_name}</Text>
            </View>
          </View>
          <View className='item__wrap-info'>
            <View className='item__wrap-info-item'>
              <Text className='item__wrap-info-item-title'>经营品类</Text>
              <Text className='item__wrap-info-item-text'>{itemInfo.category}</Text>
            </View>
            <View className='item__wrap-info-item'>
              <Text className='item__wrap-info-item-title'>满减</Text>
              <Text className='item__wrap-info-item-text'>{itemInfo.activities}</Text>
            </View>
            <View className='item__wrap-info-rules'>{itemInfo.rules}</View>
          </View>   
        </ScrollView>
        <View className='item__footer'>
          <Footer  data={ itemInfo } />
        </View>
      </View>
    )
  }
}

export default StoreItem
