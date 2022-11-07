import Vue from 'vue'
export default {
    get(pageNum,pageSize,keyword) { 
        return Vue.prototype.$http.get(`/brand/list`, {
            params: {
                pageNum,
                pageSize,
                keyword
            }
        })
    },
    del(d) { 
        return Vue.prototype.$http.post('/brand/update/showStatus', {
            ...d
        })
    }
}