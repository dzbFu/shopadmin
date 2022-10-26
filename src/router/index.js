import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component: Home,
    children:[
      {
        path:'',
        component: () => import('../components/shouye.vue')
      },
      {
        path:'allocMenu',
        component:() => import('../components/allocMenu.vue')
      },
      {
        path:'allocResource',
        component:() => import('../components/allocResource.vue')
      },
      {
        path:'updateMenu',
        component:() => import('../components/updateMenu.vue')
      },
      {
        path:'addMenu',
        component:() => import('../components/addMenu.vue')
      },
      {
        path:'resourceCategory',
        component:() => import('../components/resourceCategory.vue')
      }
    ]
  },
 {
  path:'/login',
  component:() => import('../views/login.vue')
 }
]

const router = new VueRouter({
  routes
})

export default router
