<template>
    <div class="productCate">
        <div class="title-box">
            <div><i class="el-icon-tickets"></i>数据列表</div>
            <el-button size="small">添加</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="编号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="分类名称" align="center">
            </el-table-column>
            <el-table-column label="级别" align="center">
                <template slot-scope="scope">
                    {{ scope.row.parentId == 0 ? '一级' : '二级' }}
                </template>
            </el-table-column>
            <el-table-column prop="productCount" label="商品数量" align="center">

            </el-table-column>
            <el-table-column prop="productUnit" label="数量单位" align="center">
            </el-table-column>
            <el-table-column label="导航栏" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.navStatus" :active-value="1" :inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="是否显示" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.showStatus" :active-value="1" :inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" align="center">
            </el-table-column>
            <el-table-column label="设置" align="center" width="200">
                <template>
                    <el-button size="mini" :disabled="$route.query.parentId ? true : false" @click="getChildren">查看下级
                    </el-button>
                    <el-button size="mini">转移商品</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
                <template slot-scope="scop">
                    <el-button size="mini" @click="$router.push('updateProductCate?id=' + scop.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scop.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
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
            loading: true,
            tableData: [],
            pageNum: 1,
            pageSize: 5,
            total: 0,
        }
    },
    created() {
        if (this.$route.query.parentId) {
            this.getChildren()
        } else {
            this.getlist()
        }

    },
    methods: {
        getlist() {
            let pageNum = this.pageNum
            let pageSize = this.pageSize
            this.loading = true
            this.$api.productCate.productCategory(pageNum, pageSize).then(res => {
                this.tableData = res.data.data.list
                this.pageSize = res.data.data.pageSize
                this.total = res.data.data.total
            })
        },
        getChildren() {
            this.$router.push('?parentId=1')
            this.$route.query.parentId = 1
            let pageNum = this.pageNum
            let pageSize = this.pageSize
            this.loading = true
            this.$api.productCate.productCategoryChildren(pageNum, pageSize).then(res => {
                console.log(res.data.data)
                this.tableData = res.data.data.list
                this.pageSize = res.data.data.pageSize
                this.total = res.data.data.total
            })
        },
        handleCurrentChange() {
            if (this.$route.query.parentId) {
                this.getChildren()
            } else {
                this.getlist()
            }
        },
        handleSizeChange() {
            if (this.$route.query.parentId) {
                this.getChildren()
            } else {
                this.getlist()
            }
        },
        del(d) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.productCate.productCategoryDel(d).catch((err) => { 
                    this.$message.error(err.message);
                })
            })
        }

    },
    watch: {
        $route() {
            if (this.$route.query.parentId) {
                this.getChildren()
            } else {
                this.getlist()
            }
        }
    }
}
</script>
<style lang="less" scoped>
.page {
    display: flex;
    justify-content: end;
    margin-top: 20px;
}

.productCate {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;

    .title-box {
        width: 62px;
        width: 100%;
        display: flex;
        margin-top: 20px;
        box-sizing: border-box;
        padding: 20px;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #ebeef5;
        font-size: 16px;
        color: black;
    }
}
</style>