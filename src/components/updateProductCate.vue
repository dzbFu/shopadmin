<template>
    <div class="updateProductCate">
        <el-form :model="formData" size="small" label-position="right" label-width="auto" :rules="rules"
            ref="ruleForm">
            <el-form-item label="分类名称：" prop="name">
                <el-input v-model="datas.name"></el-input>
            </el-form-item>
            <el-form-item label="上级分类：">
                <el-select v-model="formData.Classification" placeholder="请选择">
                    <el-option label="无上级分类" :value="0"></el-option>
                    <el-option v-for="(item, index) in Classification" :key="item.id" :label="item.name" :value="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位数量：" prop="productUnit">
                <el-input v-model="datas.productUnit"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model="datas.sort"></el-input>
            </el-form-item>
            <el-form-item label="是否显示：">
                <el-radio v-model="datas.showStatus" :label="1">是</el-radio>
                <el-radio v-model="datas.showStatus" :label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="是否显示在导航栏：">
                <el-radio v-model="datas.navStatus" :label="1">是</el-radio>
                <el-radio v-model="datas.navStatus" :label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="分类图标：">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="属性筛选：">
                <div v-for="(item, index) in Attributes" :key="index" style="margin-bottom:10px">
                    <el-cascader v-model="item.value" :options="attr"
                        :props="{ label: 'name', children: 'productAttributeList' }"></el-cascader>
                    <el-button size="small" style="margin-left:10px;" @click="del(index)">删除</el-button>
                </div>
                <el-button type="primary" size="small" style="margin-bottom:20px" @click="add">新增</el-button>
            </el-form-item>
            <el-form-item label="关键词：">
                <el-input v-model="datas.keywords" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="分类描述：">
                <el-input type="textarea" :rows="1" placeholder="请输入内容" v-model="datas.description">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="submit">提交</el-button>
            </el-form-item>
            
        </el-form>
    </div>
</template>

<script>
export default {
    created() {
        if (this.$route.query.id) {
            this.getlist(this.$route.query.id)
        }
        this.$api.productCate.productCategory(1, 100).then(res => {
            this.Classification = res.data.data.list
        })
        this.$api.updateProductCate.productAttribute().then(res => {
            this.attr = res.data.data
        })
    },
    data() {
        return {
            datas: [],
            attr: [],
            Attributes: [{ value: '' }],
            Classification: [],
            formData: {
                Classification: '0'
            },
            rules: {
                name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
            }
        }
    },
    methods: {
        getlist(d) {
            this.$api.updateProductCate.getlist(d).then(res => {
                this.datas = res.data.data
            })
        },
        add() {
            if (this.Attributes.length == 3) {
                this.$message({
                    message: '最多只能添加三条',
                    type: 'warning'
                });
            } else {
                this.Attributes.push({ value: '' })
            }
        },
        del(d) {
            this.Attributes.splice(d, 1)
        },
        submit() { 
            this.$api.updateProductCate.updataProductCategory(this.$route.query.id).catch(err => { 
                this.$message.error(err.message);
            })
        }
    }
}
</script>

<style lang="less" scoped>
.updateProductCate {
    width: 800px;
    margin: 20px auto;
    padding: 35px 35px 15px;
    box-sizing: border-box;
    border: 1px solid #ebeef5;
    background-color: #fff;
}
</style>