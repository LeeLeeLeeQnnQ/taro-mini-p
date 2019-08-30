import {
  APPLY_ORDER, SHOW_INFO
} from '@constants/apply'

const INITIAL_STATE = {
  createInfo: {},
  showInfo: {}
}

export default function apply(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'APPLY_ORDER': {
      return {
        ...state,
        createInfo: action.payload
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