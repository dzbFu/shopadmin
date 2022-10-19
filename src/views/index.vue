<template>
  <div class="index-box">
    <div class="sec-left">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="false"
        background-color="#304156"
        :collapse-transition="true"
        text-color="#bfcbd9"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true,     //侧边折叠状态
        userphoto: "",     //用户头像
      username:''           //用户名
    };
  },
  created() {
    //获取用户路由权限信息
    this.$api.home.menu().then(res => {
        this.userphoto = res.data.data.icon
        this.username = res.data.data.username
        console.log(res.data.data);
    });
    },
  
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
      }
    
    },
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
  }
}
</style>