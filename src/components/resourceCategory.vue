<template>
<div>
    <div class="resourceCategoryMain">
        <div class="dataDo">
        <div>
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
        </div>
        <div>
            <el-button size="mini" @click="add">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
      :data="data"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号"
        width="85%">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        >
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
      <el-dialog title="添加分类" width="40%" :visible.sync="dialogFormVisible">
        <div class="iptBox">
          <el-form label-position="right" label-width="80px" :model="formLabelAlign">
  <el-form-item label="名称：">
    <el-input size="small" v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  <el-form-item label="排序：">
    <el-input size="small" v-model="formLabelAlign.sort"></el-input>
  </el-form-item>
</el-form>
        </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="sure">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="添加分类" width="40%" :visible.sync="dialogFormVisible2">
        <div class="iptBox">
          <el-form label-position="right" label-width="80px" :model="formLabelAlign2">
  <el-form-item label="名称：">
    <el-input size="small" v-model="formLabelAlign2.name"></el-input>
  </el-form-item>
  <el-form-item label="排序：">
    <el-input size="small" v-model="formLabelAlign2.sort"></el-input>
  </el-form-item>
</el-form>
        </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="sure2">确 定</el-button>
  </div>
</el-dialog>
    </div>
    </div>  
</template>

<script>

export default {
    data(){
        return{
            data:[],
            dialogFormVisible:false,
            dialogFormVisible2:false,
            formLabelAlign: {
          name: '',
          sort: '',
        },
        formLabelAlign2: {
          name: '',
          sort: 0,
        }
        }
    },
    created(){
        this.getListAll()
    },
    methods:{
        getListAll(){
            this.$api.rights.resourceCategoryListAll().then(res =>{
                this.data = res.data.data
                this.data.forEach(item =>{
                    item.createTime = this.getTime(item.createTime)
                })
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
      return `${year}-${month < 9 ? '0' + month : month}-${day<9?'0'+day:day} ${hour < 9 ? '0' + hour : hour}:${minute < 9 ? '0' + minute:minute}:${second < 9 ? '0' + second:second}`
        },
        edit(val){
          this.formLabelAlign.name = val.name
          this.formLabelAlign.sort = val.sort
          this.dialogFormVisible = true
        },
        del(val){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //拿到这条数据的val.id，然后发送请求，发送数据给后端，然后渲染页面
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
        sure(){
          this.$confirm('是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 在这发送请求，发送数据给后端，然后渲染页面
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '编辑成功！'
          });
        }).catch(() => { 
          this.dialogFormVisible = false
        });
        },
        add(){
          this.dialogFormVisible2 = true
        },
        sure2(){
          this.$confirm('是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 在这发送请求，发送数据给后端，然后渲染页面
          this.dialogFormVisible2 = false
          this.$message({
            type: 'success',
            message: '添加成功！'
          });
        }).catch(() => { 
          this.dialogFormVisible2 = false
        });
        },
    }
}
</script>

<style lang="less" scoped>
.resourceCategoryMain{
    padding: 20px 10px 0 20px;
    box-sizing: border-box;
    .dataDo{
    margin: 30px 0 0 0;
    font-size: 16px;    
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgb(226, 226, 226);
    padding: 20px;
    box-sizing: border-box;
  }
  .iptBox{
    width: 100%;
    height: 100%;
    padding: 0 90px;
    box-sizing: border-box;
  }
}
</style>