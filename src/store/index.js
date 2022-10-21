import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    close_zt: false,
  },
  getters: {
  },
  mutations: {
    changeClose(state) { 
      state.close_zt = !state.close_zt
    }
  },
  actions: {
  },
  modules: {
  }
})
