import Vue from 'vue'
export default {
    productCategory(pageNum,pageSize) { 
        return Vue.prototype.$http.get(`/productCategory/list/0?pageNum=${pageNum||1}&pageSize=${pageSize||5}`)
    },
    productCategoryChildren(pageNum,pageSize) {
       return Vue.prototype.$http.get(`/productCategory/list/1?pageNum=${pageNum||1}&pageSize=${pageSize||5}`) 
    },
    productCategoryDel(d) {
        return Vue.prototype.$http.get(`/productCategory/delete/${d}`)
    }
}