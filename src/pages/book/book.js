import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView , Image , Button} from '@tarojs/components'
import { getWindowHeight } from '@utils/style'
import bookImg from './assets/bookImg.jpg';
// import * as actions from '@actions/user'
// import { connect } from '@tarojs/redux'／
import './book.scss'


class Book extends Component {
  config = {
    navigationBarTitleText: '报名参加'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
  }

  
  componentDidMount() {
    this.setState({ loaded: true })
  }

  handleJoin = () => {
    Taro.navigateTo({
      url: '/pages/join/join'
    })
  }



  render () {
    if (!this.state.loaded) {
      return <Loading />
    }

    // 数据
    const height = getWindowHeight(false)

    return (
      <View className='book' style={{ height }}>
        <ScrollView
          className='book__wrap'
        >
           <Image className='book__wrap-img' mode='widthFix' src={bookImg} />
        </ScrollView>
        <View className='book__footer'>
          <Button className='book__footer-btn'  onClick={this.handleJoin}>我要报名</Button>
        </View>
      </View>
    )
  }
}

export default Book
