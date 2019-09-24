import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { Tag } from '@components'
import './index.scss'
import { setLocal , getLocal  } from '@utils/local'

export default class Spread extends Component {
  static defaultProps = {
    list: []
  }


 
  reloadPage(){
    getLocal().then((id)=>{
      if(!id){
        setLocal();
      }
    })
  }

  handleClick = (item) => {
    if(item.shop_state == 2){
      Taro.showToast({
        title: '活动筹备中,敬请期待！',
        icon: 'none',
        duration: 6000
      })
      return
    }
    Taro.navigateTo({
      url: `/pages/store-item/store-item?itemId=${item.id}`
    })
  }
  render () {
    const { list } = this.props
    return (
      <View className='home-spread'>
        <View className='home-spread__list'>
          <View className='home-spread__title'>
            <Text className='home-spread__title-txt'>今日推荐</Text>
          </View>
          {(list.length <= 0) && <View 
            className='home-spread__refresh'
            onClick={this.reloadPage}>
            地理位置获取失败,点我重新加载！
          </View>}
          {list.map((item) => {
            const { id,
                    shop_name,
                    shop_logo,
                    area_id,
                    area_name,
                    category,
                    activities,
                    rules,
                    tags,
                    shop_state,
                    ele_qrcode,
                    meituan_qrcode,
                    distance} = item
            let dis_th = (distance*1).toFixed(0)/1000
            let distance_text = dis_th >= 1 ? dis_th.toFixed(2)+'km' : (distance*1).toFixed(0) + 'm';
            let area_class = 'home-spread__list-item-left-area-'+area_id;
            let tag_list =!!tags?[ category ].concat(tags.split(',')) : [ category ];
            return (
              <View
                key={id}
                className='home-spread__list-item'
                onClick={this.handleClick.bind(this, item)}>
                <View
                  className='home-spread__list-item-left'>
                  <View className='home-spread__list-item-left-ibx'>
                    <Image className='home-spread__list-item-left-ibx-img' src={shop_logo} />
                    { !!(shop_state == 2) && <View className='home-spread__list-item-left-ibx-warp'>敬请期待</View> }
                  </View>
                  <View className='home-spread__list-item-left-area'>
                    <Text className={area_class}>{area_name}</Text>
                  </View>
                </View>
                <View
                 className='home-spread__list-item-right'
                >
                  <Text className='home-spread__list-item-right-title'>{shop_name}</Text>
                  <Text className='home-spread__list-item-right-activities'>{activities}</Text>
                  <View className='home-spread__list-item-right-tag'>
                    {tag_list.map((t_item,index) => {
                      return (<Text key={index} className='home-spread__list-item-right-tag-item'>{t_item}</Text>)
                    })}
                    <Text key={index} className='home-spread__list-item-right-tag-distance'>
                      {distance_text}
                    </Text>
                  </View>
                  <Text className='home-spread__list-item-right-rules'>
                    {rules}
                  </Text>
                </View>
                <View
                 className='home-spread__list-item-fixed'
                >
                  { !!ele_qrcode && <Text className='home-spread__list-item-fixed-title'>饿了么</Text> }
                  { !!meituan_qrcode && <Text className='home-spread__list-item-fixed-title'>美团</Text> }
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
