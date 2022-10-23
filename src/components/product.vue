<template>
    <div class="product">
        <div class="search">
            <div class="search-btn-title">
                <p><i class="el-icon-search"></i>筛选搜索</p>
                <div class="search-btn">
                    <el-button size="small">重置</el-button>
                    <el-button type="primary" size="small">查询结果</el-button>
                </div>
            </div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="formInline.region" placeholder="活动区域">
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
                user: '',
                region: ''
            }
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

        .search-btn-title {
            color: black;

            i {
                margin-right: 5px;
            }

            display: flex;
            justify-content: space-between;
        }

        .search-btn {}
    }
}
</style>