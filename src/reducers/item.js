import { ITEM_INFO } from '@constants/item'

const INITIAL_STATE = {
  itemInfo: {}
}

export default function item(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ITEM_INFO: {
      return {
        ...state,
        itemInfo: action.payload
      }
    }
    default:
      return state
  }
}
