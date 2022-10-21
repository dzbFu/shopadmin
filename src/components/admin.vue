<template>
    <div id="Admain">
   <div>导航栏</div>
   <div class="adminMain">
    <div class="search">
      <div class="s-up">
       <div class="left">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
       </div>
       <div>
        <el-button size="mini">重置</el-button>
        <el-button size="mini" type="primary">查询搜索</el-button>
       </div>

      </div>
      <div class="sousuo">
        <span>输入搜索:</span>
        <el-input size="mini" v-model="input" placeholder="账号/姓名"></el-input>
      </div>
    </div>
   <div class="el-card__body">
    <div>
      <i class="el-icon-document"></i>
      <span>数据列表</span>
    </div>
    <el-button size="mini">添加</el-button>
   </div>
   <el-table
    :data="tableData"
    :cell-style="rowStyle" 
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="编号">
    </el-table-column>
    <el-table-column
      prop="username"
      label="账号">
    </el-table-column>
    <el-table-column
      prop="nickName"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="添加时间">
    </el-table-column>
    <el-table-column
      prop="loginTime"
      label="登录时间">
    </el-table-column>
    <el-table-column
      prop="status"
      label="是否启用">
      <template slot-scope="scope">
    <el-switch
    v-model="scope.row.status"
    active-color="#409EFF"
    inactive-color="#DCDFE6">
   </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <el-button size="mini" type="text">分配角色</el-button>
      <el-button size="mini" type="text">编辑</el-button>
      <el-button size="mini" type="text">删除</el-button>
    </el-table-column>
  </el-table>
   <div class="fenye">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10,15,20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
   </div>
   </div>
  </div>
 
</template>

<script>
export default {
  data(){
    return{
      input: '',
      tableData:[],
      pageSize:10,
      pageNum:1,
      total:0,
      value:true
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      this.$api.rights.getList(this.pageNum , this.pageSize).then(res =>{
        console.log(res.data.data);
        this.tableData = res.data.data.list
        this.tableData.forEach(item =>{
          item.createTime = this.getTime(item.createTime)
          item.loginTime = this.getloginTime(item.loginTime)
          item.status = this.getstatus(item.status)
        })
        this.pageNum = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.total = res.data.data.total
      })
    },
    getTime(time){
      var date = new Date(time)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      return `${year}-${month}-${day} ${hour < 9 ? '0' + hour : hour}:${minute < 9 ? '0' + minute:minute}:${second < 9 ? '0' + second:second}`
    },
    getloginTime(time){
      if(!time){
        return 'N/A'
      }else{
        var date = new Date(time)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      return `${year}-${month}-${day} ${hour < 9 ? '0' + hour : hour}:${minute < 9 ? '0' + minute:minute}:${second < 9 ? '0' + second:second}`
      }
    },
    rowStyle() {
      return "text-align:center";
    },
    // 因为数据的字段是1，因为组件所使用的数据是一个布尔值，所以要转化
    getstatus(val){
      if(val == 1){
        return true
      }else{
         return false
      }
    },
    handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.pageNum = val
      },
  },
}
</script>

<style lang="less">
#Admain{
  flex: 1;
}
.adminMain{
  padding: 15px;
  box-sizing: border-box;
  .el-card__body{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    font-size: 16px;
    span{
      margin-left: 5px;
    }
  }
  .search{
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    font-size: 16px;
    margin: 10px 0 20px 0;
    .s-up{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left{
        span{
          margin-left: 10px;
        }
      }
    }
    .sousuo{
      width: 300px;
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-left: 50px;
      margin-top: 20px;
      span{
        display: block;
        min-width: 80px;
      }
    }
  }
  .fenye{
    margin-top: 20px;
    display: flex;
    justify-content: right;
  }
}
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
 
</style>