import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    close_zt: false,
    userphoto:''
  },
  getters: {
  },
  mutations: {
    changeClose(state) { 
      state.close_zt = !state.close_zt
    },
    userphoto(state,v) {
      state.userphoto = v
     }
  },
  actions: {
  },
  modules: {
  }
})
