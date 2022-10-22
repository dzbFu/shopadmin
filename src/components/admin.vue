<template>
    <div id="Admain">
   <div class="adminMain">
    <div class="search">
      <div class="s-up">
       <div class="left">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
       </div>
       <div>
        <el-button size="mini" @click="reset">重置</el-button>
        <el-button size="mini" type="primary" @click="search">查询搜索</el-button>
       </div>

      </div>
      <div class="sousuo">
        <span>输入搜索:</span>
        <el-input size="mini" v-model="input" placeholder="账号/姓名"  clearable></el-input>
      </div>
    </div>
   <div class="el-card__body">
    <div>
      <i class="el-icon-document"></i>
      <span>数据列表</span>
    </div>
    <el-button size="mini" @click="dialogFormVisible = true">添加</el-button>
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
      <template slot-scope="scope">
      <el-button size="mini" type="text" @click="fenpei(scope.row)">分配角色</el-button>
      <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
      <el-button size="mini" type="text" @click="open(scope.row)">删除</el-button>
      </template>
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
   <el-dialog width="40%" title="添加用户" :visible.sync="dialogFormVisible">
    <el-form label-position="right" label-width="100px" :model="formLabelAlign">
  <el-form-item label="账号：">
    <el-input v-model="formLabelAlign.username"></el-input>
  </el-form-item>
  <el-form-item label="姓名：">
    <el-input v-model="formLabelAlign.nickName"></el-input>
  </el-form-item>
  <el-form-item label="邮箱：">
    <el-input v-model="formLabelAlign.email"></el-input>
  </el-form-item>
  <el-form-item label="密码：">
    <el-input v-model="formLabelAlign.password"></el-input>
  </el-form-item>
  <el-form-item label="备注：">
    <el-input type="textarea" v-model="formLabelAlign.desc"></el-input>
  </el-form-item>
  <el-form-item label="是否启用：">
    <el-radio-group v-model="radio">
    <el-radio :label="1">是</el-radio>
    <el-radio :label="0">否</el-radio>
  </el-radio-group>
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
<el-dialog width="30%" title="分配角色" :visible.sync="dialogFormVisible2">
    <el-select v-model="value1" multiple placeholder="请选择" >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
  </div>
</el-dialog>
<el-dialog width="40%" title="添加用户" :visible.sync="dialogFormVisible3">
    <el-form label-position="right" label-width="100px" :model="formLabelAlign2">
  <el-form-item label="账号：">
    <el-input v-model="formLabelAlign2.username"></el-input>
  </el-form-item>
  <el-form-item label="姓名：">
    <el-input v-model="formLabelAlign2.nickName"></el-input>
  </el-form-item>
  <el-form-item label="邮箱：">
    <el-input v-model="formLabelAlign2.email"></el-input>
  </el-form-item>
  <el-form-item label="密码：">
    <el-input type="password" v-model="formLabelAlign2.password"></el-input>
  </el-form-item>
  <el-form-item label="备注：">
    <el-input type="textarea" v-model="formLabelAlign2.desc"></el-input>
  </el-form-item>
  <el-form-item label="是否启用：">
    <el-radio-group v-model="radio2">
    <el-radio :label="1">是</el-radio>
    <el-radio :label="0">否</el-radio>
  </el-radio-group>
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible3 = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible3 = false">确 定</el-button>
  </div>
</el-dialog>
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
      value:true,
      keyword:'',
      dialogFormVisible: false,
      dialogFormVisible2:false,
      dialogFormVisible3:false,
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1: [],
      radio:1,
      radio2:1,
      formLabelAlign: {
        username: '',
        nickName: '',
        email: '',
        password:'',
        desc:''
        },
        formLabelAlign2: {
        username: '',
        nickName: '',
        email: '',
        password:'',
        desc:''
        },
    }
  },
  created(){
    this.getList()
  },
  methods:{
    open(val){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 在这发送请求接口删除
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
    edit(val){
      this.dialogFormVisible3 = true
      console.log(val);
      this.formLabelAlign2.username  = val.username
      this.formLabelAlign2.nickName = val.nickName
      this.formLabelAlign2.email = val.email
      this.formLabelAlign2.password = val.password
      if(val.status){
        this.radio2 = 1
      }else{
        this.radio2 = 0
      }
    },
    fenpei(val){
      this.dialogFormVisible2 = true
    },
    search(){
      this.keyword = this.input
      this.getList()
    },
    // 重置的
    reset(){
      this.input = ''
      this.keyword = this.input
      this.getList()
    },
    // 获取表格数据
    getList(){
      this.$api.rights.getList(this.pageNum , this.pageSize , this.keyword).then(res =>{
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
    // 重置表格中时间的数据
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
     // 重置表格中时间的数据
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
    // 是表格的数据居中
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
        this.getList()
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getList()
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