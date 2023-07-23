import Vue from 'vue'
export default {
    getList(t,pageNum,pageSize,i) { 
        return Vue.prototype.$http.get(`/productAttribute/list/${i}?pageNum=${pageNum}&pageSize=${pageSize}&type=${t}`)
    },
    getupdate(d) { 
        return Vue.prototype.$http.get(`/productAttribute/${d}`)
    },
    getattr() { 
        return Vue.prototype.$http.get('/productAttribute/category/list?pageNum=1&pageSize=100')
    },
    update(d,t) { 
        return Vue.prototype.$http.post(`/productAttribute/update/${d}`, {t})
    },
    add(d) { 
        return Vue.prototype.$http.post('/productAttribute/create',{d})
    },
    del(d) { 
        let s = {
            id:d
        }
        return Vue.prototype.$http.post('/productAttribute/delete', {
            ...s
        })
    }
}