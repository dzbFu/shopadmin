import Vue from 'vue'
export default {
    menu() { 
        return Vue.prototype.$http.get('admin/info')
       
    }
}