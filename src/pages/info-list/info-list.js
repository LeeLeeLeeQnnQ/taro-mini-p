import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getWindowHeight } from '@utils/style'
import * as actions from '@actions/info'
import Item from './item'
import './info-list.scss'


const INFO_SIZE = 20
@connect(state => state.info, { ...actions})
class InfoList extends Component {
  config = {
    navigationBarTitleText: '活动列表'
  }

  state = {
    loaded: false,
    loading: false,
    page: 1,
    hasMore: true,
    spreadList:[],
  }

  componentWillMount(){
    this.props.orderList = []
  }

  // 已经挂载数据生命周期函数
  componentDidMount() {
    this.setState({ loaded: true })
    // 获取传播列表函数
    this.loadInfoList()
  }

  handleClick = (item) => {
    Taro.navigateTo({
      url: `/pages/info-detail/info-detail?itemId=${item.id}`
    })
  }


  loadInfoList = () => {
    if (!this.state.hasMore || this.state.loading) {
      return
    }
    const payload = {
      page: this.state.page,
      page_size: INFO_SIZE
    }
    this.setState({ loading: true })

    this.props.dispatchOrderList(payload).then((res) => {
      const list = this.state.orderList.concat(res.list);
      const page = res.page;
      this.setState({ orderList: list })
      this.setState({
        loading: false,
        hasMore: res.hasMore,
        page: page && page.next_page
      })
    }).catch(() => {
      this.setState({ loading: false })
    })
  }

  render () {
    if (!this.state.loaded) {
      return <Loading />
    }
    return (
      <View className='info-list'>
        <ScrollView
          scrollY
          className='info-list__wrap'
          onScrollToLower={this.loadInfoList}
          style={{ height: getWindowHeight() }}
        >
        {(this.state.orderList.length == 0) && <View className='info-list__center'>暂无数据</View>}
        {this.state.orderList.map((item) => {
          return (
            <View
             onClick={this.handleClick.bind(this,item)}
             key={item.id}
            >
              <Item data={item}></Item>
            </View>
          )
        })}
        </ScrollView>
      </View>
    )
  }
}

export default InfoList
