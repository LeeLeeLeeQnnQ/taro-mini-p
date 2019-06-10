import Taro, { Component } from '@tarojs/taro'
import { View, Text , Button } from '@tarojs/components'
import './index.scss'

export default class Footer extends Component {
  static defaultProps = {
    onAdd: () => {}
  }

  previewImage = (pictures) => {
    Taro.previewImage({
      urls: [pictures]
    })
  }
  render () {
    const { data } = this.props
    return (
      <View className='item-footer'>
        <Button open-type="share" className='item-footer__share'>分享</Button>
        { !!data.meituan_qrcode && <Button className='item-footer__erweima' onClick={this.previewImage.bind(this,data.meituan_qrcode)}>美团下单</Button>
        }
        { !!data.ele_qrcode && <Button className='item-footer__erweima' onClick={this.previewImage.bind(this,data.ele_qrcode)}>饿了么下单</Button>
        }
      </View>
    )
  }
}
