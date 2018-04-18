<template>
  <div>
    <p class="title-header">紧急联系人评分卡</p>
    <div class="content-phonecard-box">
      <div class="phonecard-box">
        <!--1-->
        <div class="netin-time">
          <header class="form_header1">紧急联系人评分卡（总分100）</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li>紧急联系人关系</li>
              <li>本项分数</li>
              <li>是否PASS</li>
            </ul>
            <template v-for="item in rulesA">
              <ul>
                <li>{{item.remark}}</li>
                <li><input type="text" v-model="item.score"></li>
                <li></li>
              </ul>
            </template>
          <!--<ul>
              <li>母亲</li>
              <li><input type="text" v-model="rulesA.mother"></li>
              <li></li>
            </ul>
            <ul>
              <li>配偶</li>
              <li><input type="text" v-model="rulesA.spouse"></li>
              <li></li>
            </ul>
            <ul>
              <li>亲属</li>
              <li><input type="text" v-model="rulesA.relatives"></li>
              <li></li>
            </ul>
            <ul>
              <li>朋友</li>
              <li><input type="text" v-model="rulesA.friend"></li>
              <li></li>
            </ul>
            <ul>
              <li>同事</li>
              <li><input type="text" v-model="rulesA.colleague"></li>
              <li></li>
            </ul>
            -->
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
        btnEditText: '提交',
        cfInfo: {
          remark: '紧急联系人',
          rules: {}
        },
        rulesA: {},
      }
    },
    mounted() {
      this.getDetailModule();
    },
    methods: {
      getDetailModule() {
        let para = {
          shopId: sessionStorage.$getSessionStorageByName('shopId'),
          moduleName: 'creditRelationService'
        }

        Api.testApi.getDetailModule(para).then(res => {
          if (res.code == '0000') {
            let resRules = JSON.parse(res.data)
            this.rulesA = resRules;
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      SubmitSave() {
        var _this = this;
        _this.$confirm('确认提交吗？', '提示', {}).then(() => {
          console.log('res',_this.rulesA)
          let para = {
            moduleName: 'creditRelationService',
            shopId: sessionStorage.$getSessionStorageByName('shopId'),
            cfInfo: JSON.stringify(_this.rulesA)
          };

          Api.testApi.changeDetailModule(para).then(res => {

            if (res.code == '0000') {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.getDetailModule()
            } else {
              this.$message.error(res.msg);
            }
          });
        });
      }
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
