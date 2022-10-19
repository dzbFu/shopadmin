<template>
    <div>
        <div class="loginMain">
            <img class="login-center-layout"
                src="https://www.macrozheng.com/admin/static/img/login_center_bg.5307896.png" alt="">
            <div class="login">
                <div class="line"></div>
                <div class="imgBox">
                    <img src="../../public/images/home.png" alt="">
                    <p class="title">mall-admin-web</p>
                </div>
                <div class="formBox">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
  <el-form-item prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item  prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
  </el-form-item>
</el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    created() {

    },
    methods: {
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
    }
    
}
</script>
<style lang="less" scoped>
.loginMain {
    .login-center-layout {
        background: #409eff;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        margin-top: 200px;
    }
    .login{
        position: fixed;
        width: 358px;
        left: 50%;
        top: 50%;
        transform: translate(-50% , -50%);
        background-color: #fff;
        z-index: 100;
        box-shadow: 0 0px 1px 1px rgba(180, 180, 180, 0.6);
        .line{
            width: 100%;
            height: 10px;
            background-color: #53d408;
        }
        .imgBox{
            text-align: center;
            img{
                width: 56px;
                height: 56px;
                margin: 20px 0 10px 0;
            }
            .title{
                color: #409eff;
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 10px;
            }
        }
        .formBox{
            padding: 0 20px;
        }
    }
}
</style>