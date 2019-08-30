import { combineReducers } from 'redux'
import home from './home'
import user from './user'
import item from './item'
import join from './join'
import info from './info'
import apply from './apply'

export default combineReducers({
  home,
  user,
  item,
  join,
  info,
  apply,
})
