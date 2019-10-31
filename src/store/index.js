import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

let store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 订阅store变化
store.subscribe((mutation, state) => {
  console.log('mutation：', mutation)
  if (mutation.type === "setToken") {
    localStorage.setItem("token", JSON.stringify(state.token))
  }
})


export default store
