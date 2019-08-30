import Taro, { Component } from '@tarojs/taro'
import { View, Text , Image } from '@tarojs/components'
import './index.scss'

export default class PickImg extends Component {
  static defaultProps = {
    data:{},
    onImgChange: () => {}
  }
  changeImg = ( res)=>{ 
    this.props.onImgChange( res );
  }

  //点击图片选择手机相册或者电脑本地图片
  uploadImg(e) {
    var _this = this　　
    wx.chooseImage({
      count: 1,// 默认9
      sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //这里是上传操作
        wx.uploadFile({
          url: 'https://wechat.baitime.cn/wechat/index/upload', //里面填写你的上传图片服务器API接口的路径 
          filePath: tempFilePaths[0],//要上传文件资源的路径 String类型 
          name: 'file',//按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
          header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          formData: {
               //和服务器约定的token, 一般也可以放在header中
            'session_token': wx.getStorageSync('session_token')
          },
          success: function(res) {
            if (res.statusCode = 200) {
              const data = res.data;
              _this.changeImg(JSON.parse(data).data)
            }
          }
        })
      }
    })
  }

  render () {
    const { url } = this.props;
    return (
      <View className='pick-img'>
        <View
          onClick={this.uploadImg.bind(this)}
          className='pick-img__box'>
          {!!url && <Image className='pick-img__box-img' mode='widthFix' src={ url } />}
          {!url &&
            <Text className='pick-img__box-text'>点击上传</Text>
          }
        </View>
      </View>
    )
  }
}
