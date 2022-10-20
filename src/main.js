import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api'
import axios from './modules/http'
import Breadcrumb from './components/Breadcrumb.vue'
// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入 ViewUI
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);
Vue.config.productionTip = false
// 使用
Vue.prototype.$http = axios
Vue.use(ElementUI);
// 判断有没有token
router.beforeEach((to,from,next) =>{
  if(to.path  == '/login') return next()
  if(!sessionStorage.token) return next('/login')
   next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
