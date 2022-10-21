import Vue from 'vue';
import home from './home'
import login from './login'
import rights from './rights'
// 挂载Vue原型，封装的接口函数都需要在这里挂载，才可以使用
Vue.prototype.$api = {
     login,
     home,
     rights
}