import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class TitleDec extends Component {
  static defaultProps = {
    data:{
      title:"",
      dec:"",
      dec2:'',
    }
  }

  render () {
    const { data } = this.props
    return (
      <View className='title-dec'>
        <Text className='title-dec-h3'>{data.title}</Text>
        <Text className='title-dec-p'>{data.dec}</Text>
        <Text className='title-dec-p'>{data.dec2}</Text>
      </View>
    )
  }
}
