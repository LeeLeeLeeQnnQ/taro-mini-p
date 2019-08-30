import { ORDER_LIST , ORDER_DETAIL } from '@constants/info'

const INITIAL_STATE = {
  orderList: {},
  orderDetail:{},
}

export default function info(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ORDER_LIST: {
      let list = action.payload.list || []
      return {
        ...state,
        orderList: list
      }
    }
    case ORDER_DETAIL: {
      return {
        ...state,
        orderDetail: action.payload
      }
    }
    default:
      return state
  }
}
