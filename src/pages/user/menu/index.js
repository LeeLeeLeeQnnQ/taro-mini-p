import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
// import jump from '@utils/jump'
import classNames from 'classnames'
import './index.scss'

const MENU_LIST = [{
  key: 'order',
  text: '活动报名信息',
  url: '/pages/info-list/info-list',
}]

export default class Menu extends Component {
  handleClick = (menu) => {
    if (menu.key === 'order') {
      Taro.navigateTo({
        url: menu.url
      })
    }
  }

  render () {
    return (
      <View className='user-menu'>
        <View className='user-menu__title'>
          <Text className='user-menu__title-txt'>我的</Text>
        </View>
        {MENU_LIST.map((menu, index) => {
          // NOTE 不用伪元素选择器，需自行计算
          return (
            <View
              key={menu.key}
              className='user-menu__item'
              onClick={this.handleClick.bind(this, menu)}
            >
              <Text className='user-menu__item-txt'>{menu.text}</Text>
              <Text className='user-menu__item-arrow'>＞ </Text>
            </View>
          )
        })}
      </View>
    )
  }
}
