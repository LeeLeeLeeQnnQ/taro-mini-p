import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class TitleDec extends Component {
  static defaultProps = {
    data:{
      title:"",
      dec:"",
      dec2:'',
      dec3:'',
      dec4:'',
      dec5:'',
      dec6:'',
      ctRed:false,
      isHasImg:false,
      exampleImg:''
    }
  }

  previewImage = (pictures) => {
    Taro.previewImage({
      urls: [pictures]
    })
  }
  render () {
    const { data } = this.props
    return (
      <View className='title-dec'>
        <View className='title-dec-tbox'>
          <Text className='title-dec-tbox-h3'>{data.title}</Text>
          {!!data.isHasImg && <Text className='title-dec-tbox-btn' onClick={this.previewImage.bind(this,data.exampleImg)} >查看示例</Text>}
        </View>
        {!data.ctRed && <Text className='title-dec-p'>{data.dec}</Text>}
        {!!data.ctRed && <Text className='title-dec-pr'>{data.dec}</Text>}
        <Text className='title-dec-p'>{data.dec2}</Text>
        <Text className='title-dec-p'>{data.dec3}</Text>
        <Text className='title-dec-p'>{data.dec4}</Text>
        <Text className='title-dec-p'>{data.dec5}</Text>
        <Text className='title-dec-p'>{data.dec6}</Text>
      </View>
    )
  }
}
