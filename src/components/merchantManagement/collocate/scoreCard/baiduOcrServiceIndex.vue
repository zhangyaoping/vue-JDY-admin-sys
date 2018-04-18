<template>
  <div>
    <p class="title-header">OCR评分卡</p>
    <div class="content-phonecard-box">
      <div class="phonecard-box">
        <!--1-->
        <div class="netin-time">
          <header class="form_header1">一、性别-(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li>性别</li>
              <li>本项分数</li>
              <li>是否PASS</li>
            </ul>
            <ul>
              <li>男</li>
              <li><input type="text" v-model.number="man"></li>
              <li></li>
            </ul>
            <ul>
              <li>女</li>
              <li><input type="text" v-model.number="woman"></li>
              <li></li>
            </ul>
          </div>
        </div>
        <!--2-->
        <div class="netin-time">
          <header class="form_header1">二、身份证地址(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li>身份证地址</li>
              <li>本项分数</li>
              <li>是否PASS</li>
            </ul>
            <template v-for="item in ocrBdData.idCard_address">
              <ul>
                <li>{{item.remark}}</li>
                <li><input type="text" v-model.number="item.score"></li>
                <li></li>
              </ul>
            </template>
          </div>
        </div>
        <!--3-->
        <div class="netin-time">
          <header class="form_header1">三、年龄(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li>年龄 = A</li>
              <li>本项分数</li>
              <li>是否PASS</li>
            </ul>
            <ul>
              <li>A < <input type="text" v-model.number="ageRules.age"></li>
              <li><input type="text" v-model.number="ageRules.score"></li>
              <li>
                <el-checkbox @change="handleChecked15" v-model="isPass15" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <ul>
              <li>A>= {{ageRules.age}} 且A < <input type="text" v-model.number="ageRules1.age"></li>
              <li><input type="text" v-model.number="ageRules1.score"></li>
              <li>
                <el-checkbox @change="handleChecked16" v-model="isPass16" label="Pass项" border></el-checkbox>
              </li>
            </ul>

            <ul>
              <li>A >= {{ageRules1.age}} 且A < <input type="text" v-model.number="ageRules2.age"></li>
              <li><input type="text" v-model.number="ageRules2.score"></li>
              <li></li>
            </ul>
            <ul>
              <li>A >= {{ageRules2.age}} 且A < <input type="text" v-model.number="ageRules3.age"></li>
              <li><input type="text" v-model.number="ageRules3.score"></li>
              <li></li>
            </ul>
            <ul>
              <li>A >= {{ageRules3.age}} 且A < <input type="text" v-model.number="ageRules4.age"></li>
              <li><input type="text" v-model.number="ageRules4.score"></li>
              <li></li>
            </ul>
            <ul>
              <li>A > = <input type="text" v-model.number="ageRules5.age"></li>
              <li><input type="text" v-model.number="ageRules5.score"></li>
              <li>
                <el-checkbox @change="handleChecked17" v-model="isPass17" label="Pass项" border></el-checkbox>
              </li>
            </ul>
          </div>
        </div>
        <div class="netin-time">
          <header class="form_header1">四、地区（总分100）</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li>地区</li>
              <li>本项分数</li>
              <li>是否PASS</li>
            </ul>
            <!--PASS项-->
            <ul>
              <li>
                <div class="filesList">
                  <template v-for="items in passData.area">
                    <div class="pull-down-box">
                      <el-dropdown class="pull-down" trigger="click" @command="handleCommandPs">
                      <span class="el-dropdown-link">
                        {{items.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{code:items.code,type:'fps'}">非PASS</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </div>
              </li>
              <li>
                <el-checkbox @change="handleChecked18" v-model="isPass18" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <!--一档-->
            <ul>
              <li>
                <div class="filesList">
                  <template v-for="items in fpassData.area">
                    <div class="pull-down-box">
                      <el-dropdown class="pull-down" trigger="click" @command="handleCommandFps">
                      <span class="el-dropdown-link">
                        {{items.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{code:items.code,type:'ps'}">PASS</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </div>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
        <div class="netin-time">
          <header class="form_header1">OCR评分卡</header>
          <div class="netin-time-table">
            <div class="phone-weight">
              <div class="box-pw">
                <p>性别：</p>
                <input type="text" v-model.number="sum">%
              </div>
              <div class="box-pw">
                <p>身份证地址：</p>
                <input type="text" v-model.number="sum1">%
              </div>
              <div class="box-pw">
                <p>年龄：</p>
                <input type="text" v-model.number="sum2">%
              </div>
            </div>
          </div>
        </div>
        <div class="totalWeight">当前总权重比例为{{sumA}}%，达到100%才能保存</div>
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
        ageRules: {},
        ageRules1: {},
        ageRules2: {},
        ageRules3: {},
        ageRules4: {},
        ageRules5: {},
        ocrBdData: {
          // age_info: {},//年龄
          // area_limit: {},//区域限制
          // idCard_address: {},//身份证地址
          // sex_info: {},//性别
          // ocr_weight: {}//OCR评分卡
        },
        man: '',
        woman: '',
        sum: 0,
        sum1: 0,
        sum2: 0,
        isPass15: false,
        isPass16: false,
        isPass17: false,
        isPass18: false,
        passData: [],//pass
        fpassData: []//fpass
      }
    },
    computed: {
      sumA: function () {
        return parseInt(this.sum ? this.sum : 0) + parseInt(this.sum1 ? this.sum1 : 0) + parseInt(this.sum2 ? this.sum2 : 0)
      }
    },
    mounted() {
      this.getDetailModule();
    },
    methods: {
      //PASS项
      handleChecked15(val) {
        console.log(val)
        this.ageRules.pass_status = val ? 1 : 0;//0 非PASS  1PASS
      },
      handleChecked16(val) {
        console.log(val)
        this.ageRules1.pass_status = val ? 1 : 0;//0 非PASS  1PASS
      },
      handleChecked17(val) {
        console.log(val)
        this.ageRules5.pass_status = val ? 1 : 0;//0 非PASS  1PASS
      },
      handleChecked18(val) {
        console.log(val)
        this.passData.pass_status = val ? 1 : 0;//0 非PASS  1PASS
      },
      /////////////////////////////////
      getDetailModule() {
        let para = {
          shopId: sessionStorage.$getSessionStorageByName('shopId'),
          moduleName: 'creditOcrBdService'
        }


        Api.testApi.getDetailModule(para).then(res => {
          if (res.code == '0000') {
            let resData = JSON.parse(res.data)
            if (resData) {
              // sex_info: {},//性别
              this.ocrBdData = resData;
              this.man = this.ocrBdData.sex_info.man
              this.woman = this.ocrBdData.sex_info.woman
              // idCard_address: {},//身份证地址
              this.ocrBdData.idCard_address = resData.idCard_address;
              //年龄--------------------
              this.ocrBdData.age_info = resData.age_info;
              this.ageRules = this.ocrBdData.age_info.age_one;
              this.ageRules1 = this.ocrBdData.age_info.age_two;
              this.ageRules2 = this.ocrBdData.age_info.age_three;
              this.ageRules3 = this.ocrBdData.age_info.age_four;
              this.ageRules4 = this.ocrBdData.age_info.age_five;
              this.ageRules5 = this.ocrBdData.age_info.age_six;
              this.isPass15 = this.ageRules.pass_status == 1 ? true : false;
              this.isPass16 = this.ageRules1.pass_status == 1 ? true : false;
              this.isPass17 = this.ageRules5.pass_status == 1 ? true : false;

              // area_limit: {},//区域限制
              this.ocrBdData.area_limit = resData.area_limit;
              this.passData = this.ocrBdData.area_limit.not_pass;
              this.isPass18 = this.passData.pass_status == 1 ? true : false;
              this.fpassData = this.ocrBdData.area_limit.pass;


              // ocr_weight: {}//OCR评分卡
              this.ocrBdData.ocr_weight = resData.ocr_weight;
              console.log('res========', this.ocrBdData.ocr_weight)
              this.sum = parseInt(this.ocrBdData.ocr_weight.sex_info)
              this.sum1 = parseInt(this.ocrBdData.ocr_weight.idCard_address)
              this.sum2 = parseInt(this.ocrBdData.ocr_weight.age_info)
            }
          } else {
            this.$message.error(res.msg);
          }

        })
      },
      SubmitSave() {
        var _this = this;
        //评分
        this.ocrBdData.ocr_weight.sex_info = this.sum;
        this.ocrBdData.ocr_weight.idCard_address = this.sum1;
        this.ocrBdData.ocr_weight.age_info = this.sum2;
        //pass
        this.ocrBdData.age_info.age_one = this.ageRules;
        this.ocrBdData.age_info.age_two = this.ageRules1;
        this.ocrBdData.age_info.age_three = this.ageRules2;
        this.ocrBdData.age_info.age_four = this.ageRules3;
        this.ocrBdData.age_info.age_five = this.ageRules4;
        this.ocrBdData.age_info.age_six = this.ageRules5;
        this.ocrBdData.sex_info.man = this.man
        this.ocrBdData.sex_info.woman = this.woman
        if (this.sumA != 100) {
          this.$message({
            message: '总权重比例需100%才能保存,请重新配制',
            type: 'warning'
          });
        } else {
          _this.$confirm('确认提交吗？', '提示', {}).then(() => {
            let para = {
              moduleName: 'creditOcrBdService',
              shopId: sessionStorage.$getSessionStorageByName('shopId'),
              cfInfo: JSON.stringify(this.ocrBdData)
            };
            console.log('res', para);

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
      },

      //pass
      handleCommandPs(data) {
        let site = JSON.parse(JSON.stringify(data));
        if (site.type == 'fps') {
          this.areaOption(this.passData.area, this.fpassData.area, site)
        }
      },
      //fpass
      handleCommandFps(data) {
        let site = JSON.parse(JSON.stringify(data));
        if (site.type == 'ps') {
          this.areaOption(this.fpassData.area, this.passData.area, site)
        }
      },

      //地区档位选择共用方法
      areaOption(arr1, arr2, arr3) {
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i].code == arr3.code) {
            arr2.push(arr1[i])
            arr1.splice(i, 1);
          }
        }
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

  .pull-down {
    background-color: rgba(64, 158, 255, .1);
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64, 158, 255, .2);
    white-space: nowrap;
    margin: 5px;
  }

  .totalWeight {
    height: 45px;
    line-height: 45px;
    color: orangered;
  }

  .pull-down-box {
    display: inline-block;
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
              min-height: 70px;
              display: flex;
              justify-content: center;
              align-items: center;
              .filesList {
                text-align: left;
                padding: 10px;
                width: 100%;
              }
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
