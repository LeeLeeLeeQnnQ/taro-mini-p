import {
  HOME_BANNER, HOME_SPREAD
} from '@constants/home'
import Taro from '@tarojs/taro'
const INITIAL_STATE = {
  bannerList: {},
  spreadList: [],
}

export default function home(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'HOME_BANNER': {
      return {
        ...state,
        bannerList: action.payload
      }
    }
    case 'HOME_SPREAD': {

      let list = action.payload.list || [];
      return {
        ...state,
        spreadList: state.spreadList.concat(list)
      }
    }
    default:
      return state
  }
}
