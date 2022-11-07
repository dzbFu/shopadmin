<template>
    <div class="productAttrList">
        <div class="title">
            <div>
                <i class="el-icon-tickets"></i>
                数据列表
            </div>
            <el-button size="mini" @click="add">添加</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px;"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center">
            </el-table-column>
            <el-table-column prop="id" label="编号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="属性名称" align="center">
            </el-table-column>
            <el-table-column label="属性是否可选" align="center">
                <template slot-scope="scope">
                    {{ scope.row.selectType | selectType }}
                </template>
            </el-table-column>
            <el-table-column label="属性值的录入方式" align="center">
                <template slot-scope="scope">
                    {{ scope.row.inputType | inputType }}
                </template>
            </el-table-column>
            <el-table-column prop="inputList" label="可选值列表" align="center">
            </el-table-column>
            <el-table-column prop="sort" label="排序" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="update(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="sec-box">
            <div>
                <el-select v-model="secValue" placeholder="请选择" size="small">
                    <el-option label="删除" :value="1">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="submit" style="margin-left:20px" size="small">确定</el-button>
            </div>
            <el-pagination @size-change="handleSizeChange" background="" @current-change="handleCurrentChange"
                :current-page="pageNum" :page-sizes="[5, 10, 15, 20]" :page-size.sync="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageNum: 1,
            pageSize: 5,
            total: 5,
            tableData: [],
            secValue: '',
            secId: '',
        }
    },
    created() {
        this.$api.productAttrList.getList(this.$route.query.type, this.pageNum, this.pageSize, this.$route.query.id).then(res => {
            this.tableData = res.data.data.list
            res.data.data.total = this.total
        })
    },
    filters: {
        selectType(d) {
            switch (d) {
                case 0:
                    return '不可选';
                    break;
                case 1:
                    return '单选';
                    break;
                case 2:
                    return '多选';
                    break;
            }
        },
        inputType(d) {
            switch (d) {
                case 1:
                    return '从列表选取'
                    break;
                case 0:
                    return '手工录入'
                default:
                    break;
            }
        }
    },
    methods: {
        update(d) {
            this.$router.push('updateProductAttr?id=' + d)
        },
        add() {
            this.$router.push('updateProductAttr')
        },
        handleSelectionChange(v) {
            v.forEach(item => {
                this.secId += item.id + ','
            });
            this.secId = this.secId.slice(0, -1)
            if (v.length == 0) {
                this.secId = ''
            }
        },
        submit() {
            if (this.secValue == '') {
                this.$message({
                    message: '请选择类型',
                    type: 'warning'
                });
            } else if (this.secId == '') {
                this.$message({
                    message: '请选择一条记录',
                    type: 'warning'
                });
            } else {
                this.$api.productAttrList.del(this.secId).catch(err => {
                    this.$message.error(err.message)
                })
            }
        },
        del(s) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.productAttrList.del(s).catch(err => {
                    this.$message.error(err.message)
                })
            })

        },
        handleSizeChange() {
            this.$api.productAttrList.getList(this.$route.query.type, this.pageNum, this.pageSize, this.$route.query.id).then(res => {
                this.tableData = res.data.data.list
                res.data.data.total = this.total
            })
        },
        handleCurrentChange() {
            this.$api.productAttrList.getList(this.$route.query.type, this.pageNum, this.pageSize, this.$route.query.id).then(res => {
                this.tableData = res.data.data.list
                res.data.data.total = this.total
            })
        }
    }
}
</script>

<style lang="less" scoped>
.productAttrList {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;

    .title {
        width: 100%;
        height: 62px;
        box-sizing: border-box;
        padding: 0 20px;
        border: 1px solid #ebeef5;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .sec-box {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
}
</style>