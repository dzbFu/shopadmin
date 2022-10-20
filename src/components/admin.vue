<template>
  <div>
   <div>导航栏</div>
   <div class="adminMain">
   <div class="el-card__body">
    <div>
      <i class="el-icon-document"></i>
      <span>数据列表</span>
    </div>
    <el-button>添加</el-button>
   </div>
   </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.adminMain{
  padding: 15px;
  .el-card__body{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid #e5e5e5;
    font-size: 16px;
    span{
      margin-left: 5px;
    }
  }
}
</style>