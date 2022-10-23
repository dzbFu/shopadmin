<template>
    <div class="box">
       <div class="search">
            <div class="top">
                <div>
                    <span class="el-icon-search"></span>
                    <span>筛选搜索</span>
                </div>
                <div class="anniu">
                    <el-button size="small">重置</el-button>
                     <el-button size="small" type="primary">查询结果</el-button>
                </div>
            </div>
            <div class="bottom">
                <div class="main">
                    <label for="active">活动名称:</label>
                    <el-input id="active" v-model="input" size="small" placeholder="活动名称"></el-input>
                </div>
            </div>
       </div>
       <div class="middle">
            <div class="left">
                <span class="el-icon-tickets"></span>
                <span>数据列表</span>
            </div>
            <div class="right">
                <el-button size="small">秒杀时间段列表</el-button>
                <el-button size="small">秒杀活动</el-button>
            </div>
       </div>
       <div class="table">
        <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
       </div>
    </div>
</template>

<script>
export default {

    
}
</script>

<style lang="less" scoped >
    .box{
        box-sizing: border-box;
        padding: 20px;
        
        .search{
            border: 1px solid #eee;
            padding: 20px;
            margin-bottom: 20px;
            .top{
                display: flex;
                justify-content: space-between;
                align-items: center;
                 .el-icon-search{
                    margin-right: 5px;
                    font-size: 16px;
            }
                span:nth-of-type(2){
                    font-size: 16px;
            }
            }
            .bottom{
                padding-left: 50px;
                margin-bottom: 18px;
                .main{
                    width: 40%;
                    .el-input{
                        width: 30%;
                        margin-left: 20px;
                    }
                    input{
                        width: 30% !important;
                    }
                }
            }
        }
        .middle{
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #eee;
            .left{
                .el-icon-tickets{
                    font-weight: 400;
                    margin-right: 5px;
                    font-size: 16px;
                }
                span:nth-of-type(2){
                    font-size: 16px;
                    font-weight: 400;
                }
            }
        }
    }
</style>