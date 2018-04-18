<template>
  <div>
    <p class="title-header">网贷黑名单评分卡</p>
    <div class="content-phonecard-box">
      <div class="phonecard-box">
        <!--1-->
        <div class="netin-time">
          <header class="form_header1">网贷黑名单评分卡(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li>网贷分=A</li>
              <li>是否PASS</li>
            </ul>
            <!-- <ul>creditLoanProveService
              <li>命中“客户逾期，法院执行名单，老赖黑名单”等字段</li>
              <li>
                <el-checkbox @change="handleChecked17" v-model="isPass17" label="Pass项" border></el-checkbox>
              </li>
            </ul> -->
            <ul>
              <li>A > =<input type="text" v-model.number="rules.max_score"></li>

              <li>
                <el-checkbox @change="handleChecked18" v-model="isPass18" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <ul>
              <li>A =<input type="text" v-model.number="rules.min_score"></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-button size="small" class="saveBtn" type="primary" @click.native="SubmitSave">
        {{btnEditText}}
      </el-button>
    </div>
  </div>
</template>
<script>
  import Api from '@/api';
  import sessionStorage from '@/storage/sessionStorage'

  export default {
    data() {
      return {
        isPass17: false,
        isPass18: false,
        btnEditText: '提交',
        cfInfo: {
          remark: '黑名单数据',
          rules: []
        },
        rules: {},
      }
    },
    mounted() {
      this.getDetailModule();
    },
    methods: {

      // handleChecked17(val){
      //   console.log(val)
      //   this.rulesA.pass_status = val ? 1 : 0;//0 非PASS  1PASS
      // },
      handleChecked18(val) {
        console.log(val)
        this.rulesB.pass_status = val ? 1 : 0;
      },
      getDetailModule() {
        let para = {
          shopId: sessionStorage.$getSessionStorageByName('shopId'),
          moduleName: 'creditBlacklistTdService'
        }

        Api.testApi.getDetailModule(para).then(res => {
          if (res.code == '0000') {
            let resRules = JSON.parse(res.data)
            // this.rulesA = resRules.rules[0];
            // this.isPass17 = this.rulesA.pass_status == 1 ? true : false;
            this.rules = resRules;
            console.log('res', this.rules)
            this.isPass18 = this.rules.pass_status == 1 ? true : false;
            // console.log('res',resRules)
          }
          else {
            this.$message.error(res.msg);
          }

        })
      },
      SubmitSave() {
        this.cfInfo = {
          remark: '黑名单数据',
          rules: []
        };
        var _this = this;
        // this.rulesB.score_rate = this.rulesA.score_rate;
        // this.rulesC.score_rate = this.rulesA.score_rate;
        // this.cfInfo.rules.push(this.rulesA);
        this.rules.pass_status = this.isPass18 == true ? 1 : 0;
        _this.$confirm('确认提交吗？', '提示', {}).then(() => {
          let para = {
            moduleName: 'creditBlacklistTdService',
            shopId: sessionStorage.$getSessionStorageByName('shopId'),
            cfInfo: JSON.stringify(this.rules)
          };

          Api.testApi.changeDetailModule(para).then(res => {
            if (res.code == '0000') {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.getDetailModule()
              this.editFormVisible = false;
            } else {
              this.$message.error(res.msg);
            }
          });
        });
      },
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .title-header {
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #e5e5e5;
    margin-left: 10px;
    background-color: #e5e5e5;
  }

  .content-phonecard-box {

    .phonecard-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .netin-time {
        margin-left: 10px;
        margin-bottom: 10px;
        border: 1px solid #e5e5e5;
        .form_header1 {
          border: 1px solid #e5e5e5;
          padding: 15px 0;
        }
        .remark-box {
          border: 1px solid #e5e5e5;
          .remark-p {
            color: orangered;
          }
          p {
            text-align: left;
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
          }
        }
        .netin-time-table {
          text-align: center;
          .title-table {
            background-color: #e5e5e5;
            .title-text {
              display: flex;
              flex-direction: column;
              p {
                input {
                  width: 60px;
                  height: 30px;
                  border: 1px solid #e5e5e5;
                  text-align: center;
                  margin: 0 5px;
                }
              }
            }
          }
          ul {
            display: flex;
            li {
              border: 1px solid #e5e5e5;
              flex: 1;
              height: 75px;
              display: flex;
              justify-content: center;
              align-items: center;
              input {
                width: 60px;
                height: 30px;
                border: 1px solid #e5e5e5;
                text-align: center;
                margin: 0 5px;
              }
            }
            .title-text-a {
              display: flex;
              flex-direction: column;
            }
          }
          .phone-weight {
            display: flex;
            .box-pw {
              display: flex;
              flex: 1;
              height: 45px;
              line-height: 45px;
              justify-content: center;
              align-items: center;
              border: 1px solid #e5e5e5;
              input {
                width: 70px;
                height: 30px;
                border: 1px solid #e5e5e5;
                text-align: center;
                margin: 0 5px;
              }
            }
          }
        }
      }
    }

  }


</style>
