<template>
  <div class="index-box">
    <div class="sec-left">
      <el-menu
        default-active=""
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="false"
        background-color="#304156"
        :collapse-transition="true"
        text-color="#bfcbd9"
        router
      >
        <el-menu-item index="">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu
          v-for="(item) in menus"
          :index="item.name"
          :key="item.id"
          background-color="#1f2d3d"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item
            v-for="(item) in item.children"
            :index="item.name"
            :key="item.id"
          >{{item.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true, //侧边折叠状态
      userphoto: "", //用户头像
      username: "", //用户名
      menus: [] //用户权限列表
    };
  },
  created() {
    //获取用户路由权限信息
    this.$api.home.menu().then(res => {
      this.userphoto = res.data.data.icon;
      this.username = res.data.data.username;
      console.log(res.data.data.menus);
      //用户权限数据重组
      let menus = res.data.data.menus;
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].parentId == 0) {
          this.menus.push(menus[i]);
          this.menus[this.menus.length - 1].children = [];
        } else {
            // menus[i].name=this.menus[this.menus.length - 1].name+'/'+menus[i].name
          this.menus[this.menus.length - 1].children.push(menus[i]);
        }
      }
      console.log(this.menus);
    });
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
::v-deep .el-menu-item {
  min-width: 0 !important;
}
.index-box {
  width: 100%;
  height: 100vh;
  .sec-left {
    position: fixed;
    overflow: scroll;
    overflow-x: hidden;
    height: 100vh;
  }
  .sec-left::-webkit-scrollbar {
    display: none;
  }
  //   ::v-deep .el-menu-item{
  //     background-color: #1f2d3d !important;
  //   }
}
</style>