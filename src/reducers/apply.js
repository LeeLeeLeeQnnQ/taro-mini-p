import {
  APPLY_ORDER, SHOW_INFO, SHOP_LIST_INFO
} from '@constants/apply'

const INITIAL_STATE = {
  createInfo: {},
  showInfo: {},
  shopList: {},
}

export default function apply(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'APPLY_ORDER': {
      return {
        ...state,
        createInfo: action.payload
      }
    }
    case 'SHOP_LIST_INFO': {
      return {
        ...state,
        shopList: action.payload
      }
    }
    case 'SHOW_INFO': {

      let list = action.payload.list || [];
      return {
        ...state,
        showInfo: action.payload
      }
    }
    default:
      return state
  }
}