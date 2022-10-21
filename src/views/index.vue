<template>
  <div class="index-box">
   <div style="max-width:200px" class="big-left">
    <div class="sec-left">
      <el-menu
        :default-active="childrenOpen"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        :collapse="$store.state.close_zt"
        background-color="#304156"
        :collapse-transition="true"
        text-color="#bfcbd9"
        router
        :default-openeds="openeds"
      >
        <el-menu-item index="/">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu
          v-for="(item,index) in menus"
          :index="item.name"
          :key="index"
          background-color="#1f2d3d"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item
            v-for="(item,index) in item.children"
            :index="item.name"
            :key="index"
          >{{item.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
   </div>
    <div class="sec-right">
      <Breadcrumb :datas="dataBreadcrumb"></Breadcrumb>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import HomeView from "../views/index.vue";
import Breadcrumb from '../components/Breadcrumb.vue'
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      isCollapse: true, //侧边折叠状态
      userphoto: "", //用户头像
      username: "", //用户名
      menus: [], //用户权限列表
      menuChildren: [],//侧边子选项
      openeds: JSON.parse(sessionStorage.getItem('open')),//获取默认选中
      childrenOpen: '',
      dataBreadcrumb: [],//面包屑数据
    };
  },
  watch: {
    $route(to,from) { 
      this.getBreadcrumb()
    }
  },
  created() {
    this.getlist()  //获取用户侧边栏
  },
  //进入路由拉取侧边栏
  beforeRouteEnter(to, from, next) { 
      next((vm) => {
        if (to.path == '/') {
          vm.childrenOpen = to.path
        } else { 
          vm.childrenOpen = to.path.replace('/','')
        }
      })
    
    if (from.path == '/login') {
      next((vm) => { 
        vm.getlist()
      })
    } else {
      next()
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(keyPath);
      sessionStorage.setItem('open',JSON.stringify(keyPath))
    },
    //获取面包屑数据
    getBreadcrumb() { 
      this.dataBreadcrumb = []
      this.menus.forEach(item => {
          item.children.forEach(s => {
            if (s.name == this.$route.path.replace('/', '')) { 
              this.dataBreadcrumb.push(item.title) 
              this.dataBreadcrumb.push(s.title) 
            }
           })
      });
        console.log(this.dataBreadcrumb)
    },
    getlist() {
      //获取用户路由权限信息
      this.$api.home.menu().then(res => {
        this.menus=[]
        this.userphoto = res.data.data.icon;
        this.username = res.data.data.username;
        //用户权限数据重组
        let menus = res.data.data.menus;
        for (let i = 0; i < menus.length; i++) {
          if (menus[i].parentId == 0) {
            this.menus.push(menus[i]);
            this.menus[this.menus.length - 1].children = [];
          } else {
            // menus[i].name=this.menus[this.menus.length - 1].name+'/'+menus[i].name
            this.menus[this.menus.length - 1].children.push(menus[i]);
            this.menuChildren.push(menus[i].name);
          }
        }
        this.getBreadcrumb()
        var route1 = {
          path: "/",
          component: HomeView,
          children: [
            {
              path: "",
              component: () => import("../components/shouye.vue")
            }
          ]
        };
        this.menuChildren.forEach(item => {
          route1.children.push({
            path: item,
            component: () => import(`../components/${item}.vue`)
          });
        });
        this.$router.addRoute(route1);
      });
    }
  }
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}
::v-deep .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
::v-deep .el-menu-vertical-demo {
  // min-height: calc(100vh - 60px);
  height: 100%;
}
::v-deep .el-menu-item {
  min-width: 0 !important;
}
.index-box {
  width: 100%;
  height: 100vh;
  display: flex;
  .sec-left {
    overflow-y: scroll;
    height: 100vh;
    display: flex;
  }
  .sec-left::-webkit-scrollbar {
    display: none;
  }
  //   ::v-deep .el-menu-item{
  //     background-color: #1f2d3d !important;
  //   }
  .sec-right {
    flex: 1;
    height: 100vh;
    overflow: auto;
  }
}
</style>