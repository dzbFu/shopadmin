import Vue from 'vue'
export default {
    getlist(id) {
      return  Vue.prototype.$http.get(`/product/updateInfo/${id}`)
    }
}