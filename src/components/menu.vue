<template>
  <div class="menuMain">
    <div class="el-card__body">
    <div>
      <i class="el-icon-document"></i>
      <span>数据列表</span>
    </div>
    <el-button size="mini" @click="addMenu">添加</el-button>
   </div>
   <div class="table">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="title"
        label="菜单名称">
      </el-table-column>
      <el-table-column
        prop="level"
        label="菜单级数">
      </el-table-column>
      <el-table-column
        prop="name"
        label="前端名称">
      </el-table-column>
      <!-- 前端图标不会做 -->
      <el-table-column
        prop="icon"
        label="前端图标">
        <svg  aria-hidden="true" class="svg-icon"><use
        xlink:href="#icon-product"></use></svg>
      </el-table-column>  
      <el-table-column
        prop="hidden"
        label="是否显示">
        <template slot-scope="scope">
     <el-switch
       v-model="scope.row.hidden"
      active-color="#409EFF"
      inactive-color="#DCDFE6">
   </el-switch>
      </template> 
      </el-table-column> 
     
      <el-table-column
        prop="sort"
        label="排序">
      </el-table-column>  
      <el-table-column
        label="设置">
        <template slot-scope="scope">
        <el-button type="text" :disabled="dis" @click="chakan(scope.row)">查看下级</el-button>
        </template>
      </el-table-column>  
      <el-table-column
        label="操作">
        <template slot-scope="scope">
        <el-button type="text" @click="edit(scope.row)">编辑</el-button>
        <el-button type="text" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>  
    </el-table>
   </div>
   <div class="fenye">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
   </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tableData:[],
      pageNum:1,
      pageSize:5,
      keyword:'',
      total:0,
      // 查看下级的禁用
      dis:false
    }
  },
  created(){
    this.getMenuList()
  },
  methods:{
    getMenuList(){
      this.$api.rights. menuList(this.pageNum , this.pageSize , this.keyword).then(res =>{
        this.tableData = res.data.data.list
        this.tableData.forEach(item =>{
          item.level = this.getlevel(item.level)
          item.hidden = this.getHidden(item.hidden)
        })
        this.pageNum = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.total = res.data.data.total
      })
    },
    getlevel(level){
      if(level == 0){
        return '一级'
      }
      if(level == 1){
        return '二级'
      }
    },
    getHidden(val){
      if(val == 0){
        return true
      }else{
        return false
      }
    },
    handleSizeChange(val) {
        this.pageSize = val
        this.getMenuList()
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getMenuList()
      },
      // 查看下级
      chakan(val){
        this.dis = true
        this.$api.rights.chakan(this.pageNum , this.pageSize , val.id).then(res =>{
          console.log(res);
          this.tableData = res.data.data.list
          this.tableData.forEach(item =>{
          item.level = this.getlevel(item.level)
          item.hidden = this.getHidden(item.hidden)
        })
        this.pageNum = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.total = res.data.data.total
        })
      },
      edit(val){
        this.$router.push(`/updateMenu?id=${val.id}`)
      },
      del(val){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 拿到这条数数据的id，然后发送数据，渲染页面就行，由于本接口不能用，所以发不了请求
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      addMenu(){
        this.$router.push('/addMenu')
      }
  }
}
</script>

<style lang="less">
.menuMain{
  padding: 20px;
  box-sizing: border-box;
  .el-card__body{
    margin-top: 25px;
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
  .table{
    margin-top: 20px;
  }
  .fenye{
    margin-top: 20px;
    display: flex;
    justify-content: right;
  }
}
.svg-icon{
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.18em;
    fill: currentColor;
    overflow: hidden;
}
</style>