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
    },
    listAll(){
        var url = '/resource/listAll'
        return Vue.prototype.$http.get(url)
    },
    menuList(pageNum , pageSize , keyword){
        if(keyword){
            var url=`/menu/list/0?pageNum=${pageNum}&pageSize=${pageSize}&keyword=${keyword}`
            return Vue.prototype.$http.get(url)
        }else{
            var url=`/menu/list/0?pageNum=${pageNum}&pageSize=${pageSize}`
            return Vue.prototype.$http.get(url)
        }
    },
    chakan(pageNum , pageSize , id){
        var url = `/menu/list/${id}?pageNum=${pageNum}&pageSize=${pageSize}`
        return Vue.prototype.$http.get(url)
    },
    updateMenu(id){
        var url = `/menu/${id}`
        return Vue.prototype.$http(url)
    },
    listAll(){
        var url = '/resourceCategory/listAll'
        return Vue.prototype.$http(url)
    },
    list(pageNum , pageSize , data){
        var url = `/resource/list?pageNum=${pageNum}&pageSize=${pageSize}`
        return Vue.prototype.$http.get(url , {
            params:{
                ...data
            }
        })
    },
    resourceCategoryListAll(){
        var url = '/resourceCategory/listAll'
        return Vue.prototype.$http.get(url)
    }
}