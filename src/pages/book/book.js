import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView , Image , Button} from '@tarojs/components'
import { getWindowHeight } from '@utils/style'
import bookImg from './assets/bookImg.jpg';
import { setLocal , getLocal , updateLocalCity } from '@utils/local'
import jump from '@utils/jump'
import './book.scss'

class Book extends Component {
  config = {
    navigationBarTitleText: '报名参加'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      lkey:0
    }
  }

  getStorage = (key) => {
       return Taro.getStorage({ key: key }).then(res => { return res.data}).catch(() => '')
  }
  
  componentDidMount() {
    this.setState({ loaded: true })
  }

  handleJoin = () => {
    this.getStorage('token').then((rs)=> {
        if(!!rs){
          getLocal().then((id)=>{
            if(!id){
              setLocal();
            }else{
              this.setState({ lkey: 0 }, ()=> {
                // console.log("https://wechat.baitime.cn/wechat/Wx/tb?city_id="+id)
                jump({ title:'参与方式' , url: 'https://wechat.baitime.cn/wechat/Wx/tb?city_id='+id })
              })
            }
            return
          })
        }
    });
  }

  componentDidShow(){
    getLocal().then((id)=>{
      if(!id){
        updateLocalCity()
      }
    })
  }



  render () {
    if (!this.state.loaded) {
      return <Loading />
    }

    const dingdanhao = { 
      title : "订单号" , 
      dec : "从美团／饿了么APP复制" , 
      isHasImg:true , 
      exampleImg : "http://ocs-attachment.oss-cn-qingdao.aliyuncs.com/e1.jpg" 
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
        <View className='book__fwarp'>
          <View className='book__footer'>
            <Button className='book__footer-btn'  onClick={this.handleJoin}>我要报名</Button>
          </View>
        </View>
      </View>
    )
  }
}

export default Book
