<template>
  <el-col :span="24" class="topbar-wrap">
    <div class="logo">
      <img src="../../assets/logo.png" alt="">
    </div>
    <div class="topnav">金鼎云平台管理系统</div>
    <div class="userInfo">
      <ul>
        <li>
          <div class="topbar-account topbar-btn">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link userinfo-inner">
                   你好 , {{username}} 欢迎您登录！
                  <i class="iconfont icon-shengou" style="padding-left:10px;"></i>
               </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                </el-dropdown-item>
                <el-dropdown-item @click.native="userOperation">
                  <span style="color: #555;font-size: 14px;">修改密码</span>
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialog.editPaw.show" :modal-append-to-body="false"
               custom-class="editPawDialog">
      <el-form :model="editPaw" :rules="editPawRules" ref="editPaw" label-width="100px">
        <el-form-item label="旧密码" prop="oldPaw">
          <el-input type="password" v-model="editPaw.oldPaw"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPaw">
          <el-input type="password" v-model="editPaw.newPaw"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmNewPaw">
          <el-input type="password" v-model="editPaw.confirmNewPaw"></el-input>
        </el-form-item>
      </el-form>
      <div class="textC">
        <el-button type="primary" @click.native.prevent="editPawSubmit">保存</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
  import Api from '@/api'
  import {mapActions} from 'Vuex'
  import md5 from 'js-md5';
  import sessionStorage from '@/storage/sessionStorage'

  export default {
    data() {
      return {
        dialog: {
          editPaw: {
            show: false
          }
        },
        username: decodeURI(sessionStorage.$getSessionStorageByName('roleName')),
        editPaw: {
          oldPaw: '',
          newPaw: '',
          confirmNewPaw: ''
        },
        editPawRules: {
          oldPaw: [
            {required: true, message: '请输入旧密码', trigger: 'blur'}
          ],
          newPaw: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'},
            {
              // eslint-disable-next-line
              validator(rule, value, callback, source, options) {
                var errors = [];
                if (!/^[a-z0-9]+$/.test(value)) {
                  console.log("不符合输入规则")
                  errors.push("请输入字母或特殊字符")
                }
                callback(errors);
              }
            }
          ],
          confirmNewPaw: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'},
            {
              // eslint-disable-next-line
              validator(rule, value, callback, source, options) {
                var errors = [];
                if (!/^[a-z0-9]+$/.test(value)) {
                  console.log("不符合输入规则")
                  errors.push("请输入字母或特殊字符")
                }
                callback(errors);
              }
            }
          ]
        }
      }
    },
    computed: {},
    methods: {
      ...mapActions({
        sysLogout: 'user/logout'
      }),
      userOperation() {
        this.dialog.editPaw.show = true;
      },
      logout() {
        this.sysLogout().then(() => {
          this.$router.push('/login')
        })
      },
      editPawSubmit() {
        this.$refs.editPaw.validate((valid) => {
          if (valid) {
            console.log(this.editPaw)
            let para = {
              userId: sessionStorage.$getSessionStorageByName('userId'),
              oldPwd: md5(this.editPaw.oldPaw),
              newPwd: md5(this.editPaw.newPaw),
              seNewPwd: md5(this.editPaw.confirmNewPaw)
            }
            console.log('md5', para)

            Api.testApi.changePwd(para).then(res => {
              if (res.code == '0000') {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                this.dialog.editPaw.show = false;
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .topbar-wrap {
    height: 60px;
    line-height: 60px;
    padding: 0px;
    .logo {
      width: 180px;
      float: left;
      padding-left: 60px;
      color: #fff;
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 20px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .topnav {
      color: #ffffff;
      font-size: 20px;
      height: 60px;
      line-height: 60px;
      float: left;
    }
  }

  .userInfo {
    float: right;
    height: 60px;
    & > ul {
      height: 60px;
      & > li {
        display: block;
        float: left;
        height: 60px;
        margin-right: 20px;
        color: #ffffff;
        .lang {
          line-height: 60px;
          color: #cccccc;
          cursor: pointer;
          &.cur {
            color: #fff;
          }
        }
        .user {
          display: block;
          height: 60px;
          line-height: 60px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }

  .textC {
    text-align: center;
  }

  .el-dropdown {
    color: #ffffff;
  }
</style>
