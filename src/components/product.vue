<template>
    <div class="product">
        <div class="search">
            <div class="search-btn-title">
                <p><i class="el-icon-search"></i>筛选搜索</p>
                <div class="search-btn">
                    <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" size="small">查询结果</el-button>
                </div>
            </div>
            <el-form :inline="true" ref="ruleForm" :model="formInline" size="small" class="demo-form-inline">
                <el-form-item label="输入搜索:" style="width:300px" prop="shopName">
                    <el-input v-model="formInline.shopName" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品货号:" style="width:300px" prop="number">
                    <el-input v-model="formInline.number" placeholder="商品货号"></el-input>
                </el-form-item>
                <el-form-item label="商品分类:" style="width:300px" prop="Classification">
                    <el-select v-model="formInline.Classification" placeholder="请选择" style="width:192px" :clearable="true">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品品牌:" style="width:300px" prop="brand">
                    <el-select v-model="formInline.brand" placeholder="请选择品牌" style="width:192px" :clearable="true">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上架状态:" style="width:300px" prop="isShelf">
                    <el-select v-model="formInline.isShelf" placeholder="全部" style="width:192px" :clearable="true">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态:" style="width:300px" prop="audit">
                    <el-select v-model="formInline.audit" placeholder="全部" style="width:192px" :clearable="true">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formInline: {
                shopName: '',
                number: '',
                Classification: '',
                brand: '',
                isShelf: '',
                audit:''

            }
        }
    },
    methods: {
        resetForm(formName) { 
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="less" scoped>
.product {
    width: 100%;

    .search {
        width: 90%;
        box-sizing: border-box;
        padding: 20px;
        margin: auto;
        border: 1px solid #ebeef5;
        margin-top: 20px;
        .demo-form-inline{
            margin-top: 20px;
            box-sizing: border-box;
            padding-left: 100px;
        }
        .search-btn-title {
            color: black;

            i {
                margin-right: 5px;
            }

            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .search-btn {}
    }
}
</style>