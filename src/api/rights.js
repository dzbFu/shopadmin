import Vue from 'vue'
export default{
    getList(pageNum , pageSize){
        var url=`/admin/list?pageNum=${pageNum}&pageSize=${pageSize}`
        return Vue.prototype.$http.get(url)
    }
}