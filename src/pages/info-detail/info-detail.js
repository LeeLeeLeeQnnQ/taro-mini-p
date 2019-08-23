import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView , Image , Icon } from '@tarojs/components'
import { getWindowHeight } from '@utils/style'
import defaultAvatar from '@assets/default-avatar.png'
import { connect } from '@tarojs/redux'
import './info-detail.scss'
import * as actions from '@actions/info'
import ImgView from './img-view'

@connect(state => state.info, { ...actions })
class InfoDetail extends Component {
  config = {
    navigationBarTitleText: '活动详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
    this.itemId = parseInt(this.$router.params.itemId)
  }

  // 顶级生命周期
  componentWillMount () {
    this.props.orderDetail = {};
  }

  componentDidMount() {
    const payload = {
      id: this.itemId,
      isGetinfo:true,
    } 
    this.props.dispatchOrderDetail(payload).then(() => {
      this.setState({ loaded: true })
    })
  }

  render () {
    if (!this.state.loaded) {
      return <Loading />
    }

    const { orderDetail = {} } = this.props

    // 数据
    const height = getWindowHeight(false)

    return (
      <View className='info-detail' style={{ height }}>
        <ScrollView
          className='info-detail__wrap'
        >
        <View className='info-detail__wrap-top'>
          {(orderDetail.order_state == 1) &&
            <View className='info-detail__wrap-top-box'>
              <Icon size='45' type='success' />
              <View className='info-detail__wrap-top-box-title'>
                <Text className='info-detail__wrap-top-box-title-text'>参与成功</Text>
                <Text className='info-detail__wrap-top-box-title-dec'>红包已发送</Text>
              </View>
            </View>
          }
          {(orderDetail.order_state == 0) &&
            <View className='info-detail__wrap-top-box'>
              <Icon size='45' type='waiting' />
              <View className='info-detail__wrap-top-box-title'>
                <Text className='info-detail__wrap-top-box-title-text'>报名成功</Text>
                <Text className='info-detail__wrap-top-box-title-dec'>等待审核中..</Text>
              </View>
            </View>
          }
          {(orderDetail.order_state == 4) &&
            <View className='info-detail__wrap-top-box'>
              <Icon size='45' type='warn' />
              <View className='info-detail__wrap-top-box-title'>
                <Text className='info-detail__wrap-top-box-title-text'>参与失败</Text>
                <Text className='info-detail__wrap-top-box-title-dec'>感谢您的参与</Text>
              </View>
            </View>
          }  
          </View>
          <View className='info-detail__wrap-body'>
            <View className='info-detail__wrap-body-tb'>
              <Text className='info-detail__wrap-body-tb-title'>报名信息</Text>
            </View>
            <View className='info-detail__wrap-body-bm'>
              <View className='info-detail__wrap-body-bm-main'>
                <View className='info-detail__wrap-body-bm-main-ab'>
                  <View className='info-detail__wrap-body-bm-main-ab-avatar'>
                    <Image
                      className='info-detail__wrap-body-bm-main-ab-avatar'
                      src={orderDetail.headimgurl || defaultAvatar}
                    />
                  </View>
                  <View className='info-detail__wrap-body-bm-main-ab-tb'>
                    <View className='info-detail__wrap-body-bm-main-ab-tb-title'>
                      昵称：
                      <Text className='info-detail__wrap-body-bm-main-ab-tb-title-info'>
                        {orderDetail.nickname ? orderDetail.nickname : '未获取'}
                      </Text>
                    </View>
                    <View className='info-detail__wrap-body-bm-main-ab-tb-title'>
                      商铺：
                      <Text className='info-detail__wrap-body-bm-main-ab-tb-title-info'>{orderDetail.shop_name}</Text>
                    </View>
                  </View>
                </View>
                <View className='info-detail__wrap-body-bm-main-title'>订单截图</View>
                <ImgView className='info-detail__wrap-body-bm-main-cimg' data={orderDetail.order_image}/>
                <View className='info-detail__wrap-body-bm-main-title'>订单截图</View>
                <ImgView className='info-detail__wrap-body-bm-main-cimg' data={orderDetail.shop_image}/>
                <View className='info-detail__wrap-body-bm-main-title'>评论订单</View>
                <ImgView className='info-detail__wrap-body-bm-main-cimg' data={orderDetail.comment_image}/>
                <View className='info-detail__wrap-body-bm-main-title'>订单号</View>
                <View className='info-detail__wrap-body-bm-main-content'>{orderDetail.order_sn}</View>
                <View className='info-detail__wrap-body-bm-main-title'>审核状态</View>
                {(orderDetail.order_state == 0) && 
                  <View className='info-detail__wrap-body-bm-main-content'>审核中</View>
                }
                {(orderDetail.order_state == 1) && 
                  <View className='info-detail__wrap-body-bm-main-content'>参与成功,{orderDetail.order_price}元红包已发送</View>
                }
                {(orderDetail.order_state == 4) && 
                  <View className='info-detail__wrap-body-bm-main-content'>{orderDetail.remark}</View>
                }
                <View className='info-detail__wrap-body-bm-main-title'>提交时间</View>
                <View className='info-detail__wrap-body-bm-main-content'>{orderDetail.create_time}</View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default InfoDetail
