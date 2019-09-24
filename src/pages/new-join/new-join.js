import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView , Image , Button , Input } from '@tarojs/components'
import { getWindowHeight } from '@utils/style'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/join'
import PickImg from './pick-img'
import TitleDec from './title-dec'
import './new-join.scss'

@connect(state => state.join, { ...actions})

