<template>
  <div class="Breadcrumb">
    <div class="close-bread">
      <div class="left-button" @click="close" :class="{open:$store.state.close_zt}">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <el-breadcrumb separator="/" style="display:flex;align-items: center;">
        <el-breadcrumb-item to='/'>首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in datas" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  props: ['datas'],
  methods: {
    close() {
      this.$store.commit("changeClose");
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