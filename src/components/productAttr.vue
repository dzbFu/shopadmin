<template>
    <div class="productAttr">
        <div class="productAttr-title">
            <div class="title">
                <i class="el-icon-tickets"></i>
                数据列表
            </div>
            <el-button size="mini" @click="add">添加</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px;">
            <el-table-column prop="id" label="编号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="name" label="类型名称" align="center">
            </el-table-column>
            <el-table-column prop="attributeCount" label="属性数量" align="center">
            </el-table-column>
            <el-table-column prop="paramCount" label="参数数量" align="center">
            </el-table-column>
            <el-table-column label="设置" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="attr(scope.row.name,scope.row.id,0)">属性列表</el-button>
                    <el-button size="mini" @click="attr(scope.row.name,scope.row.id,1)">参数列表</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row.id, scope.row.name)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="editTitle" :visible.sync="dialogFormVisible" width="30%" @close="close">
            <el-form :model="editData" :rules="rules" label-width="100px" label-position="right">
                <el-form-item label="类型名称" prop="name">
                    <el-input v-model="editData.name"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
        <div class="fy">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page.sync="pageNum" :page-sizes="[5, 10, 15, 20]" :page-size.sync="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total.sync="total">
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
            total: 0,
            tableData: [],
            dialogFormVisible: false,
            editTitle: '',
            editId: '',
            editData: {
                name: ''
            },
            rules: {
                name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }]
            }
        }
    },
    created() {
        this.getlist()
    },
    methods: {
        handleSizeChange() {
            this.getlist()
        },
        handleCurrentChange() {
            this.getlist()
        },
        getlist() {
            this.$api.productAttr.getlist(this.pageNum, this.pageSize).then(res => {
                this.tableData = res.data.data.list
                this.total = res.data.data.total
            })
        },
        edit(d, n) {
            this.editId = d
            this.editTitle = '编辑类型'
            this.dialogFormVisible = true
            this.editData.name = n
        },
        submit() {
            if (this.editId) {
                this.$api.productAttr.update(this.editId).catch(err => {
                    this.$message.error(err.message);
                })
            } else {
                this.$api.productAttr.create(this.editData.name).catch(err => {
                    this.$message.error(err.message);
                })
            }
        },
        close() {
            this.editId = ''
        },
        add() {
            this.editTitle = '添加类型'
            this.dialogFormVisible = true
            this.editData.name = ''
        },
        del(d) {

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.productAttr.del(d).catch(err => {
                    this.$message.error(err.message)
                })
            })
        },
        attr(n,i,t) {
            this.$router.push(`productAttrList?id=${i}&name=${n}&type=${t}`)
        }
    }
}
</script>
<style lang="less" scoped>
.productAttr {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;

    .fy {
        display: flex;
        justify-content: end;
        margin-top: 20px;
    }

    .productAttr-title {
        width: 100%;
        height: 64px;
        border: 1px solid #ebeef5;
        background-color: #fff;
        display: flex;
        margin-top: 20px;
        box-sizing: border-box;
        padding: 0 20px;
        align-items: center;
        font-size: 16px;
        color: black;
        justify-content: space-between;
    }
}
</style>