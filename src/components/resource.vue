<template>
  <div>
    <div class="resourceMain">
      <div class="searchBox">
        <div class="up">
          <div>
            <i class="el-icon-search"></i>
            <span>筛选搜索</span>
          </div>
          <div>
            <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
            <el-button size="mini" type="primary" @click="search('ruleForm')">查询搜索</el-button>
          </div>
        </div>
        <div class="middle">
          <el-form
            :model="ruleForm"
            status-icon
            size="mini"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="活动名称：" prop="nameKeyword">
              <el-input v-model="ruleForm.nameKeyword"></el-input>
            </el-form-item>
            <el-form-item label="资源路径:" prop="urlKeyword">
              <el-input v-model="ruleForm.urlKeyword"></el-input>
            </el-form-item>
            <el-form-item label="资源分类："  prop="categoryId">
              <el-select v-model="ruleForm.categoryId" placeholder="全部">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="dataDo">
        <div>
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
        </div>
        <div>
            <el-button size="mini" @click="resourceCategory">资源分类</el-button>
            <el-button size="mini" @click="add">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
      :data="tableData"
      border
          style="width: 100%">
      <el-table-column
      type="index"
      label="编号"
      width="60%"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="资源名称">
      </el-table-column>
      <el-table-column
        prop="url"
        label="资源路径">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间">
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
      <!-- 分页 -->
      <div class="fenye">
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      </div>
      <!-- 编辑弹出框 -->
      <el-dialog title="编辑资源" width='40%' :visible.sync="dialogFormVisible">
        <div class="info">
          <el-form label-position="right" label-width="120px" :model="formLabelAlign">
  <el-form-item label="资源名称：">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  <el-form-item label="资源路径：">
    <el-input v-model="formLabelAlign.url"></el-input>
  </el-form-item>
  <el-form-item label="资源分类：">
    <el-select v-model="formLabelAlign.value"  clearable  placeholder="全部">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
  </el-form-item>
  <el-form-item label="描述：">
    <el-input type="textarea" v-model="formLabelAlign.desc"></el-input>
  </el-form-item>
       </el-form>
        </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="sure">确 定</el-button>
  </div>
</el-dialog>
      <!-- 添加弹出框 -->
      <el-dialog title="编辑资源" width='40%' :visible.sync="dialogFormVisible2">
        <div class="info">
          <el-form label-position="right" label-width="120px" :model="formLabelAlign2">
  <el-form-item label="资源名称：">
    <el-input v-model="formLabelAlign2.name"></el-input>
  </el-form-item>
  <el-form-item label="资源路径：">
    <el-input v-model="formLabelAlign2.url"></el-input>
  </el-form-item>
  <el-form-item label="资源分类：">
    <el-select v-model="formLabelAlign2.value"  clearable  placeholder="全部">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
  </el-form-item>
  <el-form-item label="描述：">
    <el-input type="textarea" v-model="formLabelAlign2.desc"></el-input>
  </el-form-item>
       </el-form>
        </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="sure1">确 定</el-button>
  </div>
</el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        nameKeyword: "",
        urlKeyword: "",
        categoryId:'',
      },
      tableData:[],
      pageNum:1,
      pageSize:10,
      total:0,
      options:[],
      dialogFormVisible:false,
      formLabelAlign: {
          name: '',
          url: '',
          value: '',
          desc:''
        },
        formLabelAlign2: {
          name: '',
          url: '',
          value: '',
          desc:''
        },
        dialogFormVisible2:false
    };
  },
  created(){
    this.getListAll()
    this.getList()
  },
  methods:{
    getListAll(){
        this.$api.rights.listAll().then(res =>{
            this.options = res.data.data
            this.formLabelAlign2.value = this.options[0].id 
        })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
        this.getList()
      },
      search(){
          this.getList()
      },
      getList(){
        this.$api.rights.list(this.pageNum , this.pageSize , this.ruleForm).then(res =>{
            this.tableData = res.data.data.list
            this.tableData.forEach(item =>{
                item.createTime = this.getTime(item.createTime)
            })
            this.pageNum =  res.data.data.pageNum
            this.pageSize =  res.data.data.pageSize
            this.total = res.data.data.total
        })
      },
      // 重置表格中时间的数据
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
    handleSizeChange(val) {
        this.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getList()
      },
      edit(val){
        this.dialogFormVisible = true
        console.log(val);
        this.formLabelAlign.name = val.name
        this.formLabelAlign.url = val.url
        this.formLabelAlign.value = val.categoryId
        this.formLabelAlign.desc = val.description
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
            message: '添加成功!'
          });
        }).catch(() => {
          this.dialogFormVisible = false
          this.$message({
            type: 'info',
            message: '已取消！'
          });          
        });
      },
      // 添加确认
      sure1(){
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
      del(val){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //拿到这条数据的id，然后发送请求，发送数据给后端，然后渲染页面
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
      add(){
        this.getListAll()
        this.dialogFormVisible2 = true
      },
      resourceCategory(){
        this.$router.push('/resourceCategory')
      }
  }
};
</script>

<style lang="less" scoped>
.resourceMain {
  padding: 30px;
  box-sizing: border-box;
  .searchBox {
    padding: 10px 40px 0;
    box-sizing: border-box;
    border: 1px solid rgb(226, 226, 226);
    .up {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
    }
    .middle {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
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
  .table{
    margin: 30px 0 0 0;
  }
  .fenye{
    margin: 30px 0 0 0;
    display: flex;
    justify-content: right;
  }
  .info{
    width: 100%;
    height: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
  }
}
::v-deep .demo-ruleForm {
  display: flex;
  align-items: center;
}
</style>