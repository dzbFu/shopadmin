import Vue from 'vue';
import login from './login'
// 挂载Vue原型，封装的接口函数都需要在这里挂载，才可以使用
Vue.prototype.$api = {
     login,
}