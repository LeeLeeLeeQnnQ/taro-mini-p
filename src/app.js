import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider  } from '@tarojs/redux'
import Index from './pages/index'
import configStore from './store'
import { setLocal , getLocal , updateCity } from '@utils/local'
import './app.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const store = configStore()


class App extends Component {

  state = {
    loaded: false,
  }

  config = {
    pages: [
      'pages/home/home',
      'pages/apply/apply',
      // 'pages/book/book',
      'pages/new-user/user',
      'pages/store-item/store-item',
      'pages/info-list/info-list',
      'pages/info-detail/info-detail',
      'pages/webview/webview',
      'pages/receive-list/receive-list',
      'pages/invite-list/invite-list',
      'pages/location/location'
    ],
    permission: {
      "scope.userLocation": {
        "desc": "所在地" 
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '北京外卖福利社',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#299f94",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [
      {
        pagePath: "pages/home/home",
        iconPath: "./assets/tab-bar/home.png",
        selectedIconPath: "./assets/tab-bar/home-active.png",
        text: "外卖福利"
      },
      {
        pagePath: "pages/apply/apply",
        iconPath: "./assets/tab-bar/money.png",
        selectedIconPath: "./assets/tab-bar/money-active.png",
        text: "自助返现",
      },
      {
        pagePath: "pages/new-user/user",
        iconPath: "./assets/tab-bar/user.png",
        selectedIconPath: "./assets/tab-bar/user-active.png",
        text: "个人中心"
      }]
    }
  }

  // 顶级生命周期
  componentWillMount () {
    setLocal()
    // getLocal().then((id)=>{
    //   if(!!id){
    //     Taro.getLocation().then((res)=>{
    //       let dot  = res
    //       if(res.errMsg == "getLocation:ok"){
    //         Taro.setStorage({ key: 'latitude', data: dot.latitude || '' })
    //         Taro.setStorage({ key: 'longitude', data: dot.longitude || '' })
    //       }
    //     })
    //   }
    // })
  }

  componentDidShow () {
  }

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
