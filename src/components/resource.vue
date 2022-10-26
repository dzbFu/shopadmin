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
            <el-button size="mini" type="primary">查询搜索</el-button>
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
            <el-form-item label="活动名称：" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="资源路径:" prop="url">
              <el-input v-model="ruleForm.url"></el-input>
            </el-form-item>
            <el-form-item label="资源分类："  prop="value">
              <el-select v-model="ruleForm.value" placeholder="全部">
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
            <el-button size="mini">资源分类</el-button>
            <el-button size="mini">添加</el-button>
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
        <el-button type="text">编辑</el-button>
        <el-button type="text">删除</el-button>
      </el-table-column>
    </el-table>
      </div>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        url: "",
        value:'',
      },
      tableData:[],
      pageNum:1,
      pageSize:10,
      total:0,
      options:[],
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
        })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getList(){
        this.$api.rights.list(this.pageNum , this.pageSize).then(res =>{
            console.log(res.data.data);
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
}
::v-deep .demo-ruleForm {
  display: flex;
  align-items: center;
}
</style>