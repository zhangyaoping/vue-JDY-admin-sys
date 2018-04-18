<template>
  <div>
    <p class="title-header">基础信息评分卡</p>
    <div class="content-phonecard-box">
      <div class="phonecard-box">
        <!--1-->
        <div class="netin-time">
          <header class="form_header1">一、地区（总分100）</header>
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
                      <el-dropdown class="pull-down" trigger="click" @command="handleCommand">
                      <span class="el-dropdown-link">
                        {{items.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{code:items.code,type:'1'}">一档</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'2'}">二档</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'3'}">三档</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'4'}">四档</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </div>
              </li>
              <li><input type="text" v-model.number="passData.score"></li>
              <li>
                <el-checkbox @change="handleChecked14" v-model="isPass14" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <!--一档-->
            <ul>
              <li>
                <div class="filesList">
                  <template v-for="items in firstGear.area">
                    <div class="pull-down-box">
                      <el-dropdown class="pull-down" trigger="click" @command="handleCommand1">
                      <span class="el-dropdown-link">
                        {{items.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{code:items.code,type:'ps'}">PASS</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'2'}">二档</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'3'}">三档</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'4'}">四档</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>

                  </template>
                </div>
              </li>
              <li class="title-text">
                <p>一档</p>
                <input type="text" v-model.number="firstGear.score">
              </li>
              <li></li>
            </ul>
            <!--二档-->
            <ul>
              <li>
                <div class="filesList">
                  <template v-for="items in secondGear.area">
                    <div class="pull-down-box">
                      <el-dropdown class="pull-down" trigger="click" @command="handleCommand2">
                      <span class="el-dropdown-link">
                        {{items.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{code:items.code,type:'ps'}">PASS</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'1'}">一档</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'3'}">三档</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'4'}">四档</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </div>
              </li>
              <li class="title-text">
                <p>二档</p>
                <input type="text" v-model.number="secondGear.score">
              </li>
              <li></li>
            </ul>
            <!--三档-->
            <ul>
              <li>
                <div class="filesList">
                  <template v-for="items in thirdGear.area">
                    <div class="pull-down-box">
                      <el-dropdown class="pull-down" trigger="click" @command="handleCommand3">
                      <span class="el-dropdown-link">
                        {{items.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{code:items.code,type:'ps'}">PASS</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'1'}">一档</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'2'}">二档</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'4'}">四档</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </div>
              </li>
              <li class="title-text">
                <p>三档</p>
                <input type="text" v-model.number="thirdGear.score">
              </li>
              <li></li>
            </ul>
            <!--四档-->
            <ul>
              <li>
                <div class="filesList">
                  <template v-for="items in fourthGear.area">
                    <div class="pull-down-box">
                      <el-dropdown class="pull-down" trigger="click" @command="handleCommand4">
                      <span class="el-dropdown-link">
                        {{items.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{code:items.code,type:'ps'}">PASS</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'1'}">一档</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'2'}">二档</el-dropdown-item>
                          <el-dropdown-item :command="{code:items.code,type:'3'}">三档</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </div>
              </li>
              <li class="title-text">
                <p>四档</p>
                <input type="text" v-model.number="fourthGear.score">
              </li>
              <li></li>
            </ul>
          </div>
        </div>
        <div class="netin-time">
          <header class="form_header1">二、学历程度(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li>学历程度</li>
              <li>本项分数</li>
              <li>是否PASS</li>
            </ul>
            <template v-for="item in baseData.school_degree">
              <ul>
                <li>{{item.remark}}</li>
                <li><input type="text" v-model.number="item.score"></li>
                <li></li>
              </ul>
            </template>
          </div>
        </div>
        <div class="netin-time">
          <header class="form_header1">三、设备(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li>设备</li>
              <li>本项分数</li>
              <li>是否PASS</li>
            </ul>
            <template v-for="item in baseData.device_info">
              <ul>
                <li>{{item.remark}}</li>
                <li><input type="text" v-model.number="item.score"></li>
                <li></li>
              </ul>
            </template>
          </div>
        </div>
        <div class="netin-time">
          <header class="form_header1">基础信息评分卡</header>
          <div class="netin-time-table">
            <div class="phone-weight">
              <div class="box-pw">
                <p>身份证地区：</p>
                <input type="text" v-model.number="sum">%
              </div>
              <div class="box-pw">
                <p>学历程度：</p>
                <input type="text" v-model.number="sum1">%
              </div>
              <div class="box-pw">
                <p>设备：</p>
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
        isPass14: false,
        sum: 0,
        sum1: 0,
        sum2: 0,
        baseData: {
          // area_limit: {},//地区限制
          // device_info: {},//设备信息
          // school_degree: {},//学历程度
          // base_weight: {},//基础信息选项卡
        },
        passData: [],//pass项
        firstGear: [],//一档
        secondGear: [],//二档
        thirdGear: [],//三档
        fourthGear: [],//四档
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
      //PASS
      handleCommand(data) {
        let site = JSON.parse(JSON.stringify(data));
        if (site.type == '1') {
          this.areaOption(this.passData.area, this.firstGear.area, site)
        } else if (site.type == '2') {
          this.areaOption(this.passData.area, this.secondGear.area, site)
        } else if (site.type == '3') {
          this.areaOption(this.passData.area, this.thirdGear.area, site)
        } else if (site.type == '4') {
          this.areaOption(this.passData.area, this.fourthGear.area, site)
        }
      },
      //一档
      handleCommand1(data) {
        let site = JSON.parse(JSON.stringify(data));
        if (site.type == 'ps') {
          this.areaOption(this.firstGear.area, this.passData.area, site)
        } else if (site.type == '2') {
          this.areaOption(this.firstGear.area, this.secondGear.area, site)
        } else if (site.type == '3') {
          this.areaOption(this.firstGear.area, this.thirdGear.area, site)
        } else if (site.type == '4') {
          this.areaOption(this.firstGear.area, this.fourthGear.area, site)
        }
      },
      //二档
      handleCommand2(data) {
        let site = JSON.parse(JSON.stringify(data));
        if (site.type == 'ps') {
          this.areaOption(this.secondGear.area, this.passData.area, site)
        } else if (site.type == '1') {
          this.areaOption(this.secondGear.area, this.firstGear.area, site)
        } else if (site.type == '3') {
          this.areaOption(this.secondGear.area, this.thirdGear.area, site)
        } else if (site.type == '4') {
          this.areaOption(this.secondGear.area, this.fourthGear.area, site)
        }
      },

      //三档
      handleCommand3(data) {
        let site = JSON.parse(JSON.stringify(data));
        if (site.type == 'ps') {
          this.areaOption(this.thirdGear.area, this.passData.area, site)
        } else if (site.type == '1') {
          this.areaOption(this.thirdGear.area, this.firstGear.area, site)
        } else if (site.type == '2') {
          this.areaOption(this.thirdGear.area, this.secondGear.area, site)
        } else if (site.type == '4') {
          this.areaOption(this.thirdGear.area, this.fourthGear.area, site)
        }
      },
      //四档
      handleCommand4(data) {
        let site = JSON.parse(JSON.stringify(data));
        if (site.type == 'ps') {
          this.areaOption(this.fourthGear.area, this.passData.area, site)
        } else if (site.type == '1') {
          this.areaOption(this.fourthGear.area, this.firstGear.area, site)
        } else if (site.type == '2') {
          this.areaOption(this.fourthGear.area, this.secondGear.area, site)
        } else if (site.type == '3') {
          this.areaOption(this.fourthGear.area, this.thirdGear.area, site)
        }
      },
      //PASS项
      handleChecked14(val) {
        console.log(val)
        this.passData.pass_status = val ? 1 : 0;//0 非PASS  1PASS
      },
      //获取基础信息
      getDetailModule() {
        let para = {
          shopId: sessionStorage.$getSessionStorageByName('shopId'),
          moduleName: 'creditBaseService'
        }


        Api.testApi.getDetailModule(para).then(res => {
          if (res.code == '0000') {
            let resData = JSON.parse(res.data)
            if (resData) {//地区限制
              // console.log('res', resData)
              this.baseData = resData;
              //PASS
              this.passData = this.baseData.area_limit.not_pass;

              this.isPass14 = this.passData.pass_status == 1 ? true : false;
//            //一档
              this.firstGear = this.baseData.area_limit.pass_one
              //二档
              this.secondGear = this.baseData.area_limit.pass_two;
              //三档
              this.thirdGear = this.baseData.area_limit.pass_three;
              //四档
              this.fourthGear = this.baseData.area_limit.pass_four;

              //学历程度
              this.baseData.school_degree = resData.school_degree;
              //设备信息
              this.baseData.device_info = resData.device_info;
              //基础信息选项卡
              this.baseData.base_weight = resData.base_weight;
              this.sum = parseInt(this.baseData.base_weight.area_limit)
              this.sum1 = parseInt(this.baseData.base_weight.school_degree)
              this.sum2 = parseInt(this.baseData.base_weight.device_info)
            }
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      //提交保存
      SubmitSave() {
        var _this = this;
        //基础信息选项卡
        this.baseData.base_weight.area_limit = this.sum
        this.baseData.base_weight.school_degree = this.sum1
        this.baseData.base_weight.device_info = this.sum2

        if (this.sumA != 100) {
          this.$message({
            message: '总权重比例需100%才能保存,请重新配制',
            type: 'warning'
          });
        } else {
          _this.$confirm('确认提交吗？', '提示', {}).then(() => {
            let para = {
              moduleName: 'creditBaseService',
              shopId: sessionStorage.$getSessionStorageByName('shopId'),
              cfInfo: JSON.stringify(this.baseData)
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

<style lang="scss" type="text/scss" scoped>
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
          }
          ul {
            display: flex;
            .title-text {
              display: flex;
              flex-direction: column;
              p {
                padding: 5px;
              }
            }
            li {
              border: 1px solid #e5e5e5;
              flex: 1;
              min-height: 70px;
              display: flex;
              justify-content: center;
              align-items: center;
              .filesList {
                width: 100%;
                text-align: left;
                padding: 10px;
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
