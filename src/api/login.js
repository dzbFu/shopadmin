import Vue from 'vue';
export default{
    // 登录接口
    login(data){
        var url='/admin/login';
        return Vue.prototype.$http.post(url , data)
    }
}