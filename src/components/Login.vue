<template>
  <div class="login-page">
    <div class="login-area">
      <div class="logo">
        <img src="./../assets/logo.png" alt="">
        <h3 class="title">金鼎云平台管理系统</h3>
      </div>
      <div class="form-group">
        <el-form :model="account" :rules="loginRules" ref="account" label-position="left" label-width="0px">
          <el-form-item prop="username">
            <el-input v-model="account.username" type="text" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="account.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="messageCode">
            <el-input type="text" v-model="account.messageCode" placeholder="验证码"></el-input>
            <count-down v-bind:username=account.username></count-down>
          </el-form-item>
          <el-button class="btn-login" type="primary" style="width:100%;" @click.native.prevent="handleLogin"
                     :loading="logining">登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  //  import Api from '@/api'
  import {mapActions} from 'vuex'
  import countDown from './common/countDown.vue'
  import md5 from 'js-md5';

  export default {
    components: {countDown},
    data() {
      return {
        logining: false,
        account: {
          username: '',
          password: '',
          messageCode: ''
        },
        loginRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          messageCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
      };
    },
    methods: {
      ...mapActions({
        loginByPhone: 'user/loginByPhone'
      }),
      handleLogin() {
        this.$refs.account.validate((valid) => {
          if (valid) {
            // let para = {
            //   username: this.account.username,
            //   password: md5(this.account.password),
            //   messageCode: this.account.messageCode
            // };
            let para = {
              username: this.account.username,
              password: md5(this.account.password),
              messageCode: this.account.messageCode
            };

            this.loginByPhone(para).then(res => {
              this.$router.push({path: '/'});
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>
<style type="text/scss" lang="scss" scoped>
  .login-page {
    width: 100%;
    height: 100%;
    background: url("./../assets/images/login-bj.jpg") no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;

    .login-area {
      width: 280px;
      margin: 0 auto;
      .logo {
        width: 100%;
        text-align: center;
        img {
          width: 100px;
          height: 100px;
        }
      }
    }

    .form-group {
      input::-webkit-input-placeholder {
        color: #7e9fb0;
      }
      position: relative;
      padding-bottom: 20px;
      color: #ccc;
      overflow: hidden;
      .el-input__inner {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        background: rgba(0, 0, 0, .1);
        border: 1px solid rgba(255, 255, 255, .1);
        border-radius: 4px;
        color: #ccc;
        font-size: 15px;
        overflow: hidden;
        &:hover {
          border-color: rgba(255, 255, 255, .2);
        }
        &:focus {
          border-color: rgba(255, 255, 255, .4);
        }
      }
      .el-form-item {
        &.is-error .el-input__inner {
          border-color: #d45b5b;
        }
        &.captcha input {
          width: 200px;
        }
        &.captcha img {
          float: right;
        }
      }
      .el-form-item__error {
        color: #d45b5b;
      }
    }

    .btn-login {
      display: block;
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin: 10px 0;
      padding: 0;
      background: #0163ae;
      border: none;
      border-radius: 4px;
      color: #fff !important;
      font-size: 18px;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: darken(#0e3a88, 2%)
      }
    }

    .err-msg {
      color: #d45b5b;
    }
    .tip {
      margin-top: 10px;
      color: #ccc;
    }

    .lang-toggle {
      text-align: center;
      color: #ccc;
      span {
        display: inline-block;
        width: 26px;
        height: 26px;
        line-height: 26px;
        border-radius: 50%;
        color: #ccc;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        &.cur {
          background: #ff6363;
          color: #2d3a4b;
        }
      }
    }

    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 80px;
      line-height: 80px;
      color: #ccc;
      font-size: 16px;
      text-align: center;
    }
  }

  .title {
    color: #ffffff;
    padding: 30px;
    padding-top: 50px;
  }
</style>
