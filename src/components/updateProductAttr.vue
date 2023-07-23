<template>
    <div class="updateProductAttr">
        <el-form :model="update" label-width="140px" :rules="rules" ref="form">
            <el-form-item label="属性名称：" prop="name">
                <el-input v-model="update.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="商品类型：">
                <el-select v-model="update.productAttributeCategoryId" placeholder="请选择">
                    <el-option v-for="item in shopType" :key="item.name" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类筛选样式：">
                <el-radio v-model="update.filterType" :label="0">普通</el-radio>
                <el-radio v-model="update.filterType" :label="1">颜色</el-radio>
            </el-form-item>
            <el-form-item label="能否进行检索：">
                <el-radio v-model="update.searchType" :label="0">不需要检索</el-radio>
                <el-radio v-model="update.searchType" :label="1">关键字检索</el-radio>
                <el-radio v-model="update.searchType" :label="2">范围检索</el-radio>
            </el-form-item>
            <el-form-item label="商品属性关联：">
                <el-radio v-model="update.relatedStatus" :label="0">是</el-radio>
                <el-radio v-model="update.relatedStatus" :label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="属性是否可选：">
                <el-radio v-model="update.selectType" :label="0">唯一</el-radio>
                <el-radio v-model="update.selectType" :label="1">单选</el-radio>
                <el-radio v-model="update.selectType" :label="2">复选</el-radio>
            </el-form-item>
            <el-form-item label="属性值的录入方式：">
                <el-radio v-model="update.inputType" :label="0">手工录入</el-radio>
                <el-radio v-model="update.inputType" :label="1">从下面列表中选择</el-radio>
            </el-form-item>
            <el-form-item label="属性值可选列表：">
                <el-input style="white-space:pre-wrap;" type="textarea" :rows="6" placeholder="请输入内容"
                    v-model="update.inputList">
                </el-input>
            </el-form-item>
            <el-form-item label="是否支持手动新增：">
                <el-radio v-model="update.handAddStatus" :label="0">是</el-radio>
                <el-radio v-model="update.handAddStatus" :label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="排序属性：">
                <el-input v-model="addDate.sort"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rules: {
                name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
            },
            update: {},
            shopType: [],
            addDate: {
                filterType: 0,
                handAddStatus: 0,
                id: 7,
                inputList: "",
                inputType: 0,
                name: "",
                productAttributeCategoryId: 1,
                relatedStatus: 0,
                searchType: 0,
                selectType: 2,
                sort: 100,
                type: 0,
            }
        }
    },
    created() {
        this.$api.productAttrList.getattr().then(res => {
            this.shopType = res.data.data.list
        })
        console.log(this.$route.query.id);
        if (this.$route.query.id) {
            this.$api.productAttrList.getupdate(this.$route.query.id).then(res => {
                res.data.data.inputList = res.data.data.inputList.replaceAll(',', '\n')
                this.update = res.data.data
            })
        } else {
            this.update = this.addDate
        }
    },
    methods: {
        submit() {
            this.$refs['form'].validate().then(res => {
                this.$confirm('是否提交数据？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.$route.query.id) {
                        this.$api.productAttrList.update(this.$route.query.id, this.update).catch(err => { 
                            this.$message.error(err.message)
                        })
                    } else { 
                        this.$api.productAttrList.add(this.update).catch(err => { 
                            this.$message.error(err.message)
                        })
                    }
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
::v-deep .el-textarea__inner {
    white-space: pre-wrap;
}

.updateProductAttr {
    width: 800px;
    box-sizing: border-box;
    padding: 55px 55px 35px;
    border: 1px solid #ebeef5;
    margin: 20px auto;
}
</style>