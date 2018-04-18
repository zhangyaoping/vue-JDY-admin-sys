<template>
  <div class="content-box">
    <div class="title">流量收费方式配置</div>
    <div class="radio-box">
      <el-radio-group v-model="deployVal" @change="changeHandler">
        <el-radio class="radio" label="sys_register" border>CPA注册</el-radio>
        <el-radio class="radio" label="sys_register_auth_loan" border>CPA完成全部认证</el-radio>
        <el-radio class="radio" label="sys_register_auth" border>CPA提交借款申请</el-radio>
      </el-radio-group>
    </div>
    <div class="submit-box">
      <el-button size="small" class="saveBtn" type="primary" @click.native.prevent="saveDeploy">保存</el-button>
    </div>
  </div>
</template>

<script>
  import Api from '@/api'
  import sessionStorage from '@/storage/sessionStorage'
  export default {
    data() {
      return {
        deployVal: 'sys_register',
      };
    },
    created(){
      this.getModulesInfo()
    },
    methods: {
//      async test(view) {
//        let a = view.keys;
//        let b = view.name;
//        let data = {};
//        data[a] = b;
//        this.deployVal = await data;
//      },
      //单选change事件
      changeHandler(value) {
//        console.log('改变之后的值是:' + value)
      },

      getModulesInfo() {
        let para = {
          shopId: sessionStorage.$getSessionStorageByName('shopId')
        }

        Api.testApi.getModulesInfo(para).then(res => {
          if (res.code == '0000') {
            if (res.data.sysCpa) {
              let cpas = JSON.parse(res.data.sysCpa)
              this.deployVal = cpas.cpa
            }
          } else {
            this.$message.error(res.msg);
          }

        })
      },
      //保存
      saveDeploy () {
        var _this = this;
        _this.$confirm('确认提交吗？', '提示', {}).then(() => {
          let para = {
            shopId: sessionStorage.$getSessionStorageByName('shopId'),
            cpa: this.deployVal
          }

          Api.testApi.cpaInfo(para).then(res => {
            if (res.code == '0000') {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              this.getModulesInfo()
            } else {
              this.$message.error(res.msg);
            }
          });
        });
      }
    },
    components: {}
  };
</script>
<style lang="scss" type="text/scss" scoped>
  .content-box {
    text-align: center;
    border: 1px solid #e5e5e5;
    padding: 50px 0;
    .title {
      font-size: 20px;
      padding-bottom: 30px;
    }
    .radio-box {
      .el-radio-group {
        padding-left: 30px;
      }
    }
  }

</style>
