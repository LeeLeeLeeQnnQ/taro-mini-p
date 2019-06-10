import { SHOP_LIST_INFO , CREATE_ORDER } from '@constants/join'

const INITIAL_STATE = {
  shopList: {},
  createInfo:{},
}

export default function item(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SHOP_LIST_INFO: {
      return {
        ...state,
        shopList: action.payload
      }
    }
    case CREATE_ORDER: {
      return {
        ...state,
        createInfo: action.payload
      }
    }
    default:
      return state
  }
}
