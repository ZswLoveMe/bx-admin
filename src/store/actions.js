import Vue from 'vue'
import {
  RECEIVE_USER_INFO,
} from './mutation-types'

export  default {
  // 同步记录用户信息
  recordUser({commit}, userInfo) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo.userInfo)) // 缓存至本地
    commit(RECEIVE_USER_INFO, userInfo)
  }
}
