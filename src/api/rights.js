import Vue from 'vue'
export default{
    // 用户列表
    getList(pageNum , pageSize , keyword){
        if(keyword){
            var url=`/admin/list?pageNum=${pageNum}&pageSize=${pageSize}&keyword=${keyword}`
            return Vue.prototype.$http.get(url)
        }else{
            var url=`/admin/list?pageNum=${pageNum}&pageSize=${pageSize}`
            return Vue.prototype.$http.get(url)
        }
    },
    // 角色列表
    roleList(pageNum , pageSize , keyword){
        if(keyword){
            var url=`/role/list?pageNum=${pageNum}&pageSize=${pageSize}&keyword=${keyword}`
            return Vue.prototype.$http.get(url)
        }else{
            var url=`/role/list?pageNum=${pageNum}&pageSize=${pageSize}`
            return Vue.prototype.$http.get(url)
        }
    },
    roleTree(){
        var url = `/menu/treeList`
        return Vue.prototype.$http.get(url)
    },
    roleId(id){
        var url = `/role/listMenu/${id}`
        return Vue.prototype.$http.get(url)
    }
}