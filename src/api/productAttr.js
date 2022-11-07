import Vue from 'vue'
export default {
    getlist(pageNum,pageSize) { 
        return Vue.prototype.$http.get(`/productAttribute/category/list?pageNum=${pageNum||1}&pageSize=${pageSize||5}`)
    },
    update(d) { 
        return Vue.prototype.$http.get(`/productAttribute/category/update/${d}`)
    },
    create(n) { 
        return Vue.prototype.$http.post('/productAttribute/category/create', {
            name:n
        })
    },
    del(d) { 
        return Vue.prototype.$http.get(`/productAttribute/category/delete/${d}`)
    }
}