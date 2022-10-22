<template>
  <div class="Breadcrumb">
    <div class="close-bread">
      <div class="left-button" @click="close" :class="{open:$store.state.close_zt}">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <el-breadcrumb separator="/" style="display:flex;align-items: center;">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in datas" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown class="pull" trigger="click" @command="clickMenus">
      <span class="el-dropdown-link">
        <img :src="$store.state.userphoto" alt="" style="width:40px">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="0">首页</el-dropdown-item>
        <el-dropdown-item command="1">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: ["datas"],
  methods: {
    close() {
      this.$store.commit("changeClose");
    },
    clickMenus(i) { 
      if (i == 0) {
        this.$router.push('/')
      } else { 
        sessionStorage.clear()
        this.$router.push('/login')
        this.$message({
          message: '退出成功',
          type: 'success'
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.open {
  transform: rotate(-90deg);
}
.Breadcrumb {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px #e6e6e6 solid;
  .pull{
    margin-right: 20px;
    position: relative;
    .el-dropdown-link::after{
      position: absolute;
      content: '';
      border-top: solid #999 4px;
      border-right: solid transparent 4px;
      border-left: solid transparent 4px;
      bottom: 10px;
    }
  }
  .close-bread {
    height: 100%;
    display: flex;
    align-content: center;
    .left-button {
      width: 50px;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 13px 14px;
      transition: all 0.3s;
      div {
        width: 100%;
        height: 3px;
        background-color: black;
        border-radius: 10px;
      }
    }
  }
}
</style>