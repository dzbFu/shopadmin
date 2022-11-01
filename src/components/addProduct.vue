<template>
    <div class="addproduct">
        <el-steps :active="schedule" align-center>
            <el-step title="填写商品信息"></el-step>
            <el-step title="填写商品促销"></el-step>
            <el-step title="填写商品属性"></el-step>
            <el-step title="选择商品关联"></el-step>
        </el-steps>
        <el-form :model="ruleForm" v-if="schedule == 0" :rules="rules" ref="ruleForm" label-width="100px"
            class="demo-ruleForm" size="small">
            <el-form-item label="商品分类:" prop="sort">
                <el-cascader v-model="ruleForm.sort" :props="{ label: 'name', value: 'id' }"
                    :options="formData.sortData"></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="副标题:" prop="subtitle">
                <el-input v-model="ruleForm.subtitle" placeholder="请输入副标题"></el-input>
            </el-form-item>
            <el-form-item label="商品品牌:" prop="brand">
                <el-cascader v-model="ruleForm.brand" :props="{ label: 'name', value: 'id' }" :options="formData.brand">
                </el-cascader>
            </el-form-item>
            <el-form-item label="商品介绍:" prop="desciption">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.desciption">
                </el-input>
            </el-form-item>
            <el-form-item label="商品货号:" prop="articleNumber">
                <el-input v-model="ruleForm.articleNumber" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="商品售价:" prop="price">
                <el-input v-model="ruleForm.price" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="市场价:" prop="marketPrice">
                <el-input v-model="ruleForm.marketPrice" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="商品库存:" prop="stock">
                <el-input v-model="ruleForm.stock" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="商品重量:" prop="weight">
                <el-input v-model="ruleForm.weight" placeholder="请输入内容" class="inblock"></el-input><span>克</span>
            </el-form-item>
            <el-form-item label="排序:" prop="px">
                <el-input v-model="ruleForm.px" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-button class="next-btn" @click="validate('ruleForm')" type="primary">下一步，填写商品促销</el-button>
        </el-form>
        <el-form :model="ruleForm" v-if="schedule == 1" :rules="rules" ref="ruleForm1" label-width="100px"
            class="demo-ruleForm" size="small">
            <el-form-item label="赠送积分:" prop="GiveAwayPoints">
                <el-input v-model="ruleForm.GiveAwayPoints"></el-input>
            </el-form-item>
            <el-form-item label="赠送成长值:" prop="growthValue">
                <el-input v-model="ruleForm.growthValue"></el-input>
            </el-form-item>
            <el-form-item label="积分购买限制:" prop="PointLimit">
                <el-input v-model="ruleForm.PointLimit"></el-input>
            </el-form-item>
            <el-form-item label="预告商品:" prop="isNotice">
                <el-switch v-model="ruleForm.isNotice">
                </el-switch>
            </el-form-item>
            <el-form-item label="商品上架:" prop="isListed">
                <el-switch v-model="ruleForm.isListed">
                </el-switch>
            </el-form-item>
            <el-form-item label="商品推荐:" prop="recommend">
                <el-switch v-model="ruleForm.isNew" inactive-text="新品" :active-value="true" :inactive-value="false">
                </el-switch>
                <el-switch v-model="ruleForm.recommend" inactive-text="推荐" :active-value="true" :inactive-value="false">
                </el-switch>
            </el-form-item>
            <el-form-item label="服务保证:" prop="Serve">
                <el-checkbox-group v-model="ruleForm.checkList">
                    <el-checkbox label="无忧退货"></el-checkbox>
                    <el-checkbox label="快速退款"></el-checkbox>
                    <el-checkbox label="免费包邮"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="详情页标题:" prop="DetailsTitle">
                <el-input v-model="ruleForm.DetailsTitle"></el-input>
            </el-form-item>
            <el-form-item label="详情页描述:" prop="DetailedDescription">
                <el-input v-model="ruleForm.DetailedDescription"></el-input>
            </el-form-item>
            <el-form-item label="商品关键字:" prop="keywords">
                <el-input v-model="ruleForm.keywords"></el-input>
            </el-form-item>
            <el-form-item label="商品备注:" prop="Remark">
                <el-input type="textarea" :rows="2" v-model="ruleForm.Remark">
                </el-input>
            </el-form-item>
            <el-form-item label="选择优惠方式:" prop="discount">
                <el-radio-group v-model="ruleForm.discount">
                    <el-radio-button label="无优惠"></el-radio-button>
                    <el-radio-button label="优惠促销"></el-radio-button>
                    <el-radio-button label="会员价格"></el-radio-button>
                    <el-radio-button label="阶梯价格"></el-radio-button>
                    <el-radio-button label="满减价格"></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="ruleForm.discount == '优惠促销'">
                <el-form-item label="开始时间:">
                    <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间:">
                    <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="促销价格:">
                    <el-input v-model="ruleForm.DetailedDescription" placeholder="输入促销价格" style="width:220px">
                    </el-input>
                </el-form-item>
            </el-form-item>
            <el-form-item v-if="ruleForm.discount == '会员价格'">
                <el-form-item label="黄金会员:">
                    <el-input v-model="ruleForm.goldPrice" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="白金会员:">
                    <el-input v-model="ruleForm.platinum" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="钻石会员:">
                    <el-input v-model="ruleForm.diamond" style="width:200px"></el-input>
                </el-form-item>
            </el-form-item>
            <el-form-item v-if="ruleForm.discount == '阶梯价格'">
                <el-table :data="ruleForm.LadderPrice" border style="width: 380px">
                    <el-table-column prop="date" label="数量" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.number"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="价格" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.price"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="价格" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="delTable(scope.$index)">删除</el-button>
                            <el-button type="text" @click="addTable">添加</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <div class="form-btn">
                <el-button @click="schedule--">上一步，填写商品信息</el-button>
                <el-button @click="validate('ruleForm1')" type="primary">下一步，填写商品促销</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            schedule: 0,
            ruleForm: {
                sort: '',
                name: '',
                subtitle: '',
                brand: '',
                desciption: '',
                articleNumber: '',
                price: '0',
                marketPrice: '0',
                stock: '0',
                weight: '0',
                px: '0',
                GiveAwayPoints: '0',
                growthValue: '0',
                PointLimit: '0',
                isNotice: false,
                isListed: false,
                isNew: false,
                recommend: false,
                checkList: [],
                DetailsTitle: '',
                DetailedDescription: '',
                keywords: '',
                Remark: '',
                discount: '无优惠',
                SalesPrice: '',
                goldPrice: '',
                platinum: '',
                diamond: '',
                LadderPrice: [{ number: 0, price: 0 }]
            },
            formData: {     //表单请求的数据
                sortData: [],
                brand: []
            },
            rules: {
                sort: [{ trigger: 'blur', required: true, message: '请选择商品分类' }],
                name: [{ trigger: 'blur', required: true, message: '请输入商品名称' }, { min: 2, max: 24, message: '必须在2-24位之间' }],
                subtitle: [{ trigger: 'blur', required: true, message: '请输入副标题' }],
                brand: [{ trigger: 'blur', required: true, message: '请选择品牌' }],
            }
        }
    },
    created() {
        this.$api.product.getClassification().then(res => {
            this.formData.sortData = res.data.data
        })
        this.$api.product.brand().then(res => {
            this.formData.brand = res.data.data.list
        })
    },
    methods: {
        validate(d) {
            this.$refs[d].validate(res => {
                if (res) {
                    this.schedule++
                } else {

                }
            })
        },
        delTable(d) {
            if (this.ruleForm.LadderPrice.length == 1) {

            } else { 
                this.ruleForm.LadderPrice.splice(d, 1)
            }
            
        },
        addTable() {
            if (this.ruleForm.LadderPrice.length == 3) {
                this.$message({
                    message: '最多只能添加三条',
                    type: 'warning'
                });
            } else { 
                this.ruleForm.LadderPrice.push({ number: 0, price: 0 })
            }
            

        }
    },
}
</script>
<style lang="less" scoped>
.form-btn {
    display: flex;
    justify-content: center;
}

::v-deep .is-active {
    color: #000 !important;
}

.next-btn {
    margin: auto;
    display: block;
}

.inblock {
    display: inline-block;
    width: 250px;
    margin-right: 20px;
}

.addproduct {
    width: 820px;
    box-sizing: border-box;
    margin-top: 20px !important;
    border: 1px solid #ebeef5;
    margin: auto;
    padding: 55px 55px 35px;
}

.demo-ruleForm {
    margin-top: 30px;
}
</style>