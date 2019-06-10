import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Item extends Component {
  render () {
  	const { data } = this.props
    return (
      <View className='Item'>
      	<View className='Item__top'>
        	<View className='Item__top-box'>
        		<View className='Item__top-box-text'>￥<Text className='Item__top-box-text-money'>{(data.order_price*1 > 0)?data.order_price : data.coupon_value }</Text></View>
        		<View className='Item__top-box-title'>自助返现</View>
        	</View>
        	{(data.order_state*1 == 0) && <View className='Item__top-type3'>未审核</View>}
        	{(data.order_state*1 == 1) && <View className='Item__top-type2'>已发放</View>}
        	{(data.order_state*1 == 4) && <View className='Item__top-type1'>未通过</View>}
        </View>
        <View className='Item__bottom'>
        	<View>
        		{data.create_time}
        	</View>
        	<View>
        		点击查看详情
        	</View>
        </View>
      </View>
    )
  }
}