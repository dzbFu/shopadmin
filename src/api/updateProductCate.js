import Vue from 'vue'
export default {
    getlist(d) { 
        return Vue.prototype.$http.get(`productCategory/${d}`)
    },
    productAttribute() { 
        return Vue.prototype.$http.get('/productAttribute/category/list/withAttr')
    },
    updataProductCategory(d) { 
        return Vue.prototype.$http.get(`/productCategory/update/${d}`)
    }
}