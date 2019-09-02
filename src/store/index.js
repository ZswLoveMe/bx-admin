import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        token:localStorage.getItem('token') || ''
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

export default store