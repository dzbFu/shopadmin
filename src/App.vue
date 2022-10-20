<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import HomeView from "./views/index.vue";
import router from './router'
export default {
  data() {
    return {
      menuChildren: []
    };
  },
  created() {
    //获取用户路由权限信息
    if (sessionStorage.token) { 
      this.getlist()
    }
  },
  methods: {
    getlist() {
      this.$api.home.menu().then(res => {
        let menus = res.data.data.menus;
        for (let i = 0; i < menus.length; i++) {
          if (menus[i].parentId == 0) {
          } else {
            // menus[i].name=this.menus[this.menus.length - 1].name+'/'+menus[i].name
            this.menuChildren.push(menus[i].name);
          }
        }
        var route1 = {
          path: "/",
          component: HomeView,
          children: [
            {
              path: "",
              component: () => import("./components/shouye.vue")
            }
          ]
        };
        this.menuChildren.forEach(item => {
          route1.children.push({
            path: item,
            component: () => import(`./components/${item}.vue`)
          });
        });
        this.$router.addRoute(route1);
      });
    }
  }
};
</script>
<style lang="less">
</style>
