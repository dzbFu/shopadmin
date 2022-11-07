<template>
    <div class="brand">
        <div class="top-sec">
            <div class="search">
                <div class="title"><i class="el-icon-search" style="margin-right:10px;color:black"></i>筛选搜索</div>
                <el-button type="primary" size="small" @click="search">查询结果</el-button>
            </div>
            <el-form>
                <el-form-item label="输入搜索：" label-width="130px" size="small" style="margin-top:20px;">
                    <el-input v-model="searchValue" placeholder="请输入内容" style="width:200px"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="title-box">
            <div class="title">
                <i class="el-icon-tickets"></i>
                数据列表
            </div>
            <el-button size="small">添加</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px;"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column prop="id" label="编号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="品牌名称" align="center">
            </el-table-column>
            <el-table-column prop="firstLetter" label="品牌首字母" align="center">
            </el-table-column>
            <el-table-column prop="sort" label="排序" align="center">
            </el-table-column>
            <el-table-column label="品牌制造商" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.factoryStatus" :active-value="1" :inactive-value="0"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="是否显示" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.showStatus" :active-value="1" :inactive-value="0"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="相关" align="center" width="200px">
                <template slot-scope="scope">
                    商品:<el-button type="text">{{ scope.row.productCount }}</el-button>评论:<el-button type="text">
                        {{ scope.row.productCommentCount }}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top:20px;" class="fy">
            <div>
                <el-select v-model="batchSec" placeholder="请选择" size="small">
                    <el-option label="显示品牌" :value="1">
                    </el-option>
                    <el-option label="隐藏品牌" :value="0">
                    </el-option>
                </el-select>
                <el-button size="small" type="primary" style="margin-left:10px" @click="plzx">确定</el-button>
            </div>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="pageNum" :page-sizes="[5, 10, 15, 20]" :page-size.sync="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchValue: '',
            pageNum: 1,
            pageSize: 10,
            tableData: [],
            total: 0,
            keyword: '',
            batchSec: '',
            tableSec: ''
        }
    },
    created() {
        this.getlist()
    },
    methods: {
        getlist() {
            this.$api.brand.get(this.pageNum, this.pageSize, this.keyword).then(res => {
                this.tableData = res.data.data.list
                this.total = res.data.data.total
            })
        },
        search() {
            this.pageNum = 1
            this.keyword = this.searchValue
            this.getlist()
            this.keyword = ''
        },
        handleSizeChange() {
            this.getlist()
        },
        handleCurrentChange() {
            this.getlist()
        },
        handleSelectionChange(val) {
            val.forEach(item => {
                this.tableSec += item.id + ','
            });
            this.tableSec = this.tableSec.slice(0, -1)
        },
        plzx() {
            if (!this.tableSec) {
                this.$message({
                    message: '至少选择一条记录',
                    type: 'warning'
                });
            } else if (this.batchSec==='') {
                this.$message({
                    message: '请选择执行类型',
                    type: 'warning'
                });
            } else { 
                this.$api.brand.del({ ids: this.tableSec, showStatus: this.batchSec }).catch(err => { 
                    this.$message.error(err.message);
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.brand {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;

    .top-sec {
        width: 100%;
        border: 1px solid #ebeef5;
        padding: 20px;

        .search {
            display: flex;
            align-items: center;
            justify-content: space-between;

        }
    }

    .title-box {
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        border: #ebeef5 1px solid;
        margin-top: 20px;
    }

    .fy {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>