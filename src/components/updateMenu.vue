<template>
<div>
   <div class="table">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="菜单名称：" prop="title">
    <el-input type="text" v-model="ruleForm.title" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="上级菜单：">
    <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="菜单名称：" prop="name">
    <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="前端图标：" prop="icon">
    <el-input type="text" v-model="ruleForm.icon" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="是否显示：">
    <el-radio v-model="radio" label='0'>是</el-radio>
  <el-radio v-model="radio" label='1'>否</el-radio>
  </el-form-item>
  <el-form-item label="排序：" prop="sort">
    <el-input type="text" v-model="ruleForm.sort" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
  </el-form-item>
</el-form>
   </div>
    </div>  
</template>
<script>
export default {
    data(){
       
      var title = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入菜单名称'));
        } else {
          if (!(this.ruleForm.title.length >= 2 && this.ruleForm.title.length <= 140)) {
         callback('长度在 2 到 140 个字符')
          }
          callback();
        }
      };
      var name = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入菜单名称'));
        } else if (!(this.ruleForm.name.length >= 2 && this.ruleForm.name.length <= 140)) {
          callback(new Error('长度在 2 到 140 个字符'));
        } else {
          callback();
        }
      };
      var icon = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入前端图标'));
        } else {
          if (!(this.ruleForm.icon.length >= 2 && this.ruleForm.icon.length <= 140)) {
         callback('长度在 2 到 140 个字符')
          }
          callback();
        }
      };
      return {
        ruleForm: {
          title: '',
          name: '',
          icon:'',
          sort:'',
          id:''
        },
        rules: {
            title: [
            { required: true, validator: title, trigger: 'blur' }
          ],
          name: [
            { required: true, validator: name, trigger: 'blur' }
          ],
          icon: [
            { required: true, validator: icon, trigger: 'blur' }
          ],
        },
        options: [{
          value: '0',
          label: '无上级菜单'
        }, {
          value: '1 ',
          label: '商品'
        }, {
          value: '7',
          label: '订单'
        }, {
          value: '12',
          label: '营销'
        }, {
          value: '21',
          label: '权限'
        }],
        value: '',
        radio: '1'
        
      };
    },
    created(){
        this.id = this.$route.query.id
        this.getMmenuUpdate()
    },
    methods:{
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getMmenuUpdate(){
        this.$api.rights.updateMenu(this.id).then(res =>{
            this.ruleForm.title = res.data.data.title
            this.ruleForm.name = res.data.data.name
            this.ruleForm.icon = res.data.data.icon
            this.ruleForm.sort = res.data.data.sort
            this.radio = res.data.data.hidden.toString()
            // 获取上一级菜单
            this.getMenu(res.data.data.parentId)
        })
      },
      getMenu(val){
       var res  =  this.options.find(item => item.value == val)
       this.value = res.label
      }
    }
}
</script>

<style lang="less" scoped>
    .table{
        margin: 30px 0 0 90px;
        width: 800px;
        border: 1px solid rgb(221, 221, 221);
        padding: 30px;
        box-sizing: border-box;
    }
</style>