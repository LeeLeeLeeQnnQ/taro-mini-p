import { CITY_INFO } from '@constants/local'

const INITIAL_STATE = {
  city_info:{},
}

export default function local(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CITY_INFO: {
      let list = action.payload.list || []
        return {
          ...state,
          city_info:action.payload
        }
    }
    default:
      return state
  }
}
