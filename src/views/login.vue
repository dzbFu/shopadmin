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
  <el-form-item class="ipt" prop="username">
    <i class="el-icon-user-solid"></i>
    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item class="ipt"  prop="password">
    <i class="el-icon-s-goods icon"></i>
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
    <el-form-item>
   <div class="btnBox">
    <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">登录</el-button>
    <el-button type="primary">获取体验账号</el-button>
   </div>
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
      var username = (rule, value, callback) => {
        if (value === '' || value !== 'admin' ) {
          callback(new Error('请输入正确的用户名'));
        } else {
          callback();
        }
      };
      var password = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (this.ruleForm.password.length <= 3) {
          callback(new Error('密码不能小于3 位'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
         username: '',
         password: '',
        },
        loading:false,
        rules: {
            username: [
            { validator: username, trigger: 'blur' }
          ],
          password: [
            { validator: password, trigger: 'blur' }
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
            this.loading = true
             this.$api.login.login(this.ruleForm).then(res =>{
                this.loading = false
                if(res.data.message == '操作成功'){
                    sessionStorage.setItem('token', res.data.data.token)
                    sessionStorage.setItem('tokenHead' , res.data.data.tokenHead)
                    this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                this.$router.push('/')
                }else{
                    this.$message({
                  message: res.data.message,
                  type: 'error'
                });
                }
             })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
    
}
</script>
<style lang="less">
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
        position: absolute;
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
            background-color: #409eff;
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
    .btnBox{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
         button{
            width: 140px;
        }
    }
    .ipt {
  width: 100%;
  height: 42px;
  display: flex;
  padding-left: 10px;
  border-radius: 5px;
  border: 1px solid #DCDFE6;

  .el-form-item__content {
    width: 100%;
    display: flex;
    align-items: center;
    &>i{
        color: #409eff;
    }
  }

  .el-input__inner {
    border: 0;
    flex: 1 !important;
  }
}
}
</style>