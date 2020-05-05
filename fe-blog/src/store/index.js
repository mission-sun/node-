import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    loginState(state, payload)   {
      state.isLogin = payload
      console.log('state.isLogin', state.isLogin)
    } 
  }
})

export default store