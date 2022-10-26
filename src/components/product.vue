<template>
    <div class="product">
        <div class="search">
            <div class="search-btn-title">
                <p><i class="el-icon-search"></i>筛选搜索</p>
                <div class="search-btn">
                    <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" size="small" @click="search">查询结果</el-button>
                </div>
            </div>
            <el-form :inline="true" ref="ruleForm" :model="formInline" size="small" class="demo-form-inline">
                <el-form-item label="输入搜索:" style="width:300px" prop="keyword">
                    <el-input v-model="formInline.keyword" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品货号:" style="width:300px" prop="productSn">
                    <el-input v-model="formInline.productSn" placeholder="商品货号"></el-input>
                </el-form-item>
                <el-form-item label="商品分类:" style="width:300px" prop="productCategoryId">
                    <el-cascader v-model="formInline.productCategoryId" clearable :options="withChildren"
                        :props="{ label: 'name', value: 'id', emitPath: false }" style="width:192px">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="商品品牌:" style="width:300px" prop="brandId">
                    <el-select v-model="formInline.brandId" placeholder="请选择品牌" style="width:192px" :clearable="true">
                        <el-option :label="item.name" :value="item.id" v-for="(item, index) in brand" :key=index>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上架状态:" style="width:300px" prop="publishStatus">
                    <el-select v-model="formInline.publishStatus" placeholder="全部" style="width:192px"
                        :clearable="true">
                        <el-option label="上架" value="1"></el-option>
                        <el-option label="未上架" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态:" style="width:300px" prop="verifyStatus">
                    <el-select v-model="formInline.verifyStatus" placeholder="全部" style="width:192px" :clearable="true">
                        <el-option label="审核通过" value="1"></el-option>
                        <el-option label="未通过" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-title">
            <div>
                <el-icon class="el-icon-tickets"></el-icon><span style="margin-left:10px;">数据列表</span>
            </div>
            <el-button size="mini">添加</el-button>
        </div>
        <div class="table">
            <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange" v-loading="$store.state.loading">
                <el-table-column type="selection" align="center" width="55">
                </el-table-column>
                <el-table-column prop="id" align="center" label="编号" width="80">
                </el-table-column>
                <el-table-column align="center" label="商品图片" width="120">
                    <template slot-scope="scope">
                        <img :src="scope.row.pic" alt="" style="width:80px;">
                    </template>
                </el-table-column>
                <el-table-column align="center" label="商品名称">
                    <template slot-scope="scope">
                        <p style="text-align:center;">{{ scope.row.name }}</p>
                        <p style="text-align:center;margin-top:10px;">品牌：{{ scope.row.brandName }}</p>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="价格/货号" width="120">
                    <template slot-scope="scope">
                        <p style="text-align:center;">价格：￥{{ scope.row.price }}</p>
                        <p style="text-align:center;margin-top:10px;">货号：{{ scope.row.productSn }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="address" align="center" label="标签" width="130">
                    <template slot-scope="scope">
                        <div style="margin-top:10px;">上架：<el-switch @change="change(scope.row)"
                                v-model="scope.row.publishStatus" :active-value="1" :inactive-value="0">
                            </el-switch>
                        </div>
                        <div style="margin-top:10px;">新品：<el-switch @change="change(scope.row)"
                                v-model="scope.row.newStatus" :active-value="1" :inactive-value="0">
                            </el-switch>
                        </div>
                        <div style="margin-top:10px;">推荐：<el-switch @change="change(scope.row)"
                                v-model="scope.row.recommandStatus" :active-value="1" :inactive-value="0">
                            </el-switch>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" align="center" label="排序" width="80">
                </el-table-column>
                <el-table-column align="center" label="SKU库存" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="sale" align="center" label="销量" width="80">
                </el-table-column>
                <el-table-column align="center" label="审核状态" width="80">
                    <div>
                        <p>未审核</p>
                        <el-button type="text">审核详情</el-button>
                    </div>
                </el-table-column>
                <el-table-column align="center" label="操作" width="150">
                    <template slot-scope="scope">
                        <div class="sec">
                            <el-button size="mini">查看</el-button>
                            <el-button size="mini">编辑</el-button>
                            <el-button size="mini">日志</el-button>
                            <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
            <div class="SKU">
                <div class="search-title">
                    <div>商品货号：{{ SKU.productSn }}</div>
                    <div class="search-SKU">
                        <el-input v-model="SUKword" placeholder="按sku编号搜索" size="small"></el-input>
                        <el-button icon="el-icon-search" size="small" @click="SUKsearchs"></el-button>
                    </div>
                </div>
                <el-table :data="SKUdata" border style="width: 100%">
                    <el-table-column label="SKU编号" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.skuCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="item.name" align="center" v-for="(item, index) in SKUtitle" :key="index">
                        <template slot-scope="scope">
                            {{ JSON.parse(scope.row.spData.replaceAll('\\', ''))[index]['value'] }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="销售价格">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.price"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="商品库存">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.stock"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="库存预警值">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.lowStock"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changes">确 定</el-button>
            </span>
        </el-dialog>
        <div class="foot">
            <div class="sec-s">
                <el-select v-model="sec_keyword" size="small" placeholder="批量操作">
                    <el-option v-for="item in sec" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" size="small" @click="updata()">确定</el-button>
            </div>
            <el-pagination background layout="total,sizes,prev, pager, next,jumper" :total="total"
                :page-size.sync="formInline.pageSize" :current-page.sync="formInline.pageNum" @size-change="sizeChange" @current-change="currentChange" :page-sizes="[5,10,20]">
            </el-pagination>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            sec: [
                { label: '商品上架', value: 'publishStatus:1' },
                { label: '商品下架', value: 'publishStatus:0' },
                { label: '设为推荐', value: 'recommendStatus:1' },
                { label: '取消推荐', value: 'recommendStatus:0' },
                { label: '设为新品', value: 'newStatus:1' },
                { label: '取消新品', value: 'newStatus:0' },
                { label: '转移到分类', value: 'deleteStatus:0' },
                { label: '移入回收站', value: 'deleteStatus:1' },
            ],
            sec_table: [],
            sec_keyword: '',
            formInline: {
                keyword: '',
                productSn: '',
                productCategoryId: '',
                brandId: '',
                publishStatus: '',
                verifyStatus: '',
                pageNum: 1,
                pageSize: 5,
            },
            dialogVisible: false,
            withChildren: [],
            brand: [],
            tableData: [],
            total: 0,
            SKU: {},
            SKUtitle: [],
            SKUdata: [],
            SUKword: ''
        }
    },
    created() {
        this.$api.product.getClassification().then(res => {
            this.withChildren = res.data.data
        })
        this.$api.product.brand().then(res => {
            this.brand = res.data.data.list
        })
        this.getlist()
    },
    methods: {
        currentChange() { 
            this.getlist()
        },
        sizeChange() { 
            this.getlist()
        },
        updata() {
            if (!this.sec_table[0]) {
                this.$message({
                    message: '请选择要操作的商品',
                    type: 'warning'
                });
            } else {
                this.$confirm('是否要进行批量操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.product.updata(this.sec_keyword, this.sec_table).catch((err) => {
                        this.$message({
                            message: err.message,
                            type: 'error'
                        });
                    })
                }).catch(() => {

                });
            }

        },
        handleSelectionChange(val) {
            this.sec_table = val
        },
        del(d) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.product.del(d).catch((err) => {
                    this.$message({
                        message: err.message,
                        type: 'error'
                    });
                })
            }).catch(() => {

            });

        },
        changes() {
            this.$confirm('是否进行修改？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.product.updataSKU(this.SKU.id, this.SKUdata).then(res => {
                    console.log(111);
                }).catch((res) => {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                })
            }).catch(() => {

            });
        },
        SUKsearchs() {
            let d = this.SKU.id
            let s = this.SUKword
            this.$api.product.SKUsearch(d, s).then(res => {
                this.SKUdata = res.data.data
            })
        },
        edit(d) {
            this.dialogVisible = true
            this.SKU = d
            this.$api.product.SKUtitle(d).then(res => {
                this.SKUtitle = res.data.data.list
            })
            this.$api.product.SKUdata(d).then(res => {
                this.SKUdata = res.data.data
            })
        },
        search() {
            this.getlist()
        },
        change(d) {
            this.$api.product.undataState(d)
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getlist() {
            this.$store.commit('uudataloading')
            let data = this.formInline
            this.$api.product.list(data).then(res => {
                this.tableData = res.data.data.list
                this.total = res.data.data.total
                this.$store.commit('uudataloading')
            })
        }
    }
}
</script>
<style lang="less" scoped>
.foot {
    width: 98%;
    margin: auto;
    margin-top: 20px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sec-s {
        button {
            margin-left: 10px;
        }
    }
}

.SKU {
    width: 100%;

    .search-title {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .search-SKU {
            display: flex;
            flex: 1;
            margin-left: 10px;

            ::v-deep .el-input {
                width: auto;

                input {
                    border-radius: 0;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    width: 200px;
                }
            }

            button {
                border-left: none;
                border-radius: 0;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
            }
        }
    }
}

.sec {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    button {
        margin: 0;
        margin-top: 10px;
    }
}

.product {
    width: 100%;

    .table {
        width: 98%;
        margin-top: 20px !important;
        margin: auto;
    }

    .table-title {
        width: 98%;
        // margin: auto;
        border: 1px solid #e6e6e6;
        margin-top: 20px !important;
        margin: auto;
        display: flex;
        align-items: center;
        height: 58px;
        box-sizing: border-box;
        padding: 0 15px;
        justify-content: space-between;
        font-size: 16px;
    }

    .search {
        width: 98%;
        box-sizing: border-box;
        padding: 20px;
        margin: auto;
        border: 1px solid #ebeef5;
        margin-top: 20px;

        .demo-form-inline {
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