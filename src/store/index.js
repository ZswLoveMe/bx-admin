import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        token:JSON.parse(localStorage.getItem('token'))|| null
    },
    mutations:{
        setToken(state,token){
            state.token = token
        }
    },
    actions: {
    },
    getters:{
        isLogoin:state =>{
            return !!state.token
        }
    }
})

// 订阅store变化
store.subscribe((mutation, state) => {
  if(mutation.type === 'setToken'){
    localStorage.setItem("token", JSON.stringify(state.token));
  }
});



export default store
