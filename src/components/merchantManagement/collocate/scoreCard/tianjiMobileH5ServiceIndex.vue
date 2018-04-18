<template>
  <!--haha             1-2-3-4-5-7 -->
  <div>
    <p class="title-header">手机运营商评分卡</p>
    <div class="content-phonecard-box">
      <div class="phonecard-box">
        <!--1-->
        <div class="netin-time">
          <header class="form_header1">一、入网时间(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li>入网时间 = A(月)</li>
              <li>本项分数: Z = <input type="text" v-model.number="reg_time.score_rate"></li>
              <li>是否PASS</li>
            </ul>
            <ul>
              <li>A < = <input type="text" v-model.number="reg_time.month"></li>
              <li>A * Z</li>
              <li>
                <el-checkbox @change="handleChecked1" v-model="isPass1" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <ul>
              <li>A > {{reg_time.month}}</li>
              <li>A * Z</li>
              <li></li>
            </ul>
          </div>
          <div class="remark-box">
            <p class="remark-p">入网时间每增加一月，本项分数增加{{reg_time.score_rate}}分</p>
            <p>备注：超过100分按100分算</p>
          </div>
        </div>
        <!--2-->
        <div class="netin-time">
          <header class="form_header1">二、互通电话号码(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li>
                <p>互通电话数量 = A（个）</p>
              </li>
              <li>本项分数: Z = <input type="text" v-model.number="mutual_contact_count.score_rate"></li>
              <li>是否PASS</li>
            </ul>
            <ul>
              <li>A < <input type="text" v-model.number="mutual_contact_count.count"></li>
              <li>A * Z</li>
              <li>
                <el-checkbox @change="handleChecked2" v-model="isPass2" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <ul>
              <li>A > {{mutual_contact_count.count}}</li>
              <li>A * Z</li>
              <li></li>
            </ul>
          </div>
          <div class="remark-box">
            <p class="remark-p">互通电话数量每增加一个，本项分数增加{{mutual_contact_count.score_rate}}分</p>
            <p>备注：超过100分按100分算</p>
          </div>
        </div>
        <!--3-->
        <div class="netin-time">
          <header class="form_header1">三、账单数量(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li>账单数量 = A(月)</li>
              <li>本项分数: Z = <input type="text" v-model.number="bill_count.score_rate"></li>
              <li>是否PASS</li>
            </ul>
            <ul>
              <li>A < <input type="text" v-model.number="bill_count.count"></li>
              <li>A * Z</li>
              <li>
                <el-checkbox @change="handleChecked3" v-model="isPass3" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <ul>
              <li>无上月账单</li>
              <li><input type="text" v-model.number="bill_count.without_last_month_score"></li>
              <li></li>
            </ul>
            <ul>
              <li>A > {{bill_count.count}}</li>
              <li>A * Z</li>
              <li></li>
            </ul>
          </div>
          <div class="remark-box">
            <p class="remark-p">账单数量每增加一月，本项分数增加{{bill_count.score_rate}}分</p>
            <p>备注：超过100分按100分算</p>
          </div>
        </div>
        <!--4-->
        <!--<div class="netin-time">-->
        <!--<header class="form_header1">四、金融机构通话数量(总分100)</header>-->
        <!--<div class="netin-time-table">-->
        <!--<ul class="title-table">-->
        <!--<li class="title-text">-->
        <!--<p>小贷公司数量=A</p>-->
        <!--<p>催收机构数量=B</p>-->
        <!--</li>-->
        <!--<li>本项分数: Z = <input type="text" v-model.number="financeContactRules.score_rate"></li>-->
        <!--<li>是否PASS</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>A >= <input type="text" v-model.number="financeContactRules.loanCP"></li>-->
        <!--<li>100-(A+B)> Z</li>-->
        <!--<li>-->
        <!--<el-checkbox @change="handleChecked4" v-model="isPass4" label="Pass项" border></el-checkbox>-->
        <!--</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>B>=<input type="text" v-model.number="financeContactRules1.reminderCP"></li>-->
        <!--<li>100-(A+B)> Z</li>-->
        <!--<li>-->
        <!--<el-checkbox @change="handleChecked5" v-model="isPass5" label="Pass项" border></el-checkbox>-->
        <!--</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>{{financeContactRules2.remark}}</li>-->
        <!--<li>100-(A+B)> Z</li>-->
        <!--<li></li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--<div class="remark-box">-->
        <!--<p class="remark-p">每增加一个金融机构数量（包含A和B），本项分数减{{financeContactRules.score_rate}}分；</p>-->
        <!--<p>备注：小于0分按0分算</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--5-->
        <div class="netin-time">
          <header class="form_header1">四、账户状态(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li>账户状态</li>
              <li>本项分数</li>
              <li>是否PASS</li>
            </ul>
            <ul>
              <li>其他项/不良记录</li>
              <li><input type="text" v-model.number="mobile_status.other_score"></li>
              <li>
                <el-checkbox @change="handleChecked6" v-model="isPass6" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <ul>
              <li>情况：未知</li>
              <li><input type="text" v-model.number="mobile_status.unknow_score"></li>
              <li></li>
            </ul>
            <ul>
              <li>情况：正常</li>
              <li><input type="text" v-model.number="mobile_status.nomal_score"></li>
              <li></li>
            </ul>
          </div>
        </div>
        <!--6-->
        <div class="netin-time">
          <header class="form_header1">五、特殊电话(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li class="title-text">
                <p>特殊电话 = A</p>
              </li>
              <li>本项分数</li>
              <li>是否PASS</li>
            </ul>
            <ul>
              <li>A >= {{special_mobile.not_pass_count}}</li>
              <li><input type="text" v-model.number="special_mobile.many_score"></li>
              <li>
                <el-checkbox @change="handleChecked7" v-model="isPass7" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <ul>
              <li>A = {{special_mobile.pass_count_two}}</li>
              <li><input type="text" v-model.number="special_mobile.once_score"></li>
              <li></li>
            </ul>
            <ul>
              <li>A = {{special_mobile.pass_count_one}}</li>
              <li><input type="text" v-model.number="special_mobile.zero_score"></li>
              <li></li>
            </ul>
          </div>
        </div>
        <!--7-->
        <!--<div class="netin-time">-->
        <!--<header class="form_header1">六、手机静默使用天数(总分100)</header>-->
        <!--<div class="netin-time-table">-->
        <!--<ul class="title-table">-->
        <!--<li class="title-text">-->
        <!--<p>手机静默使用天数=A(天)</p>-->
        <!--<p>非静默天数有效时间>=<input type="text" v-model="mobileData.quiet_mobile.tel_time">(秒)</p>-->
        <!--</li>-->
        <!--<li>本项分数</li>-->
        <!--<li>是否PASS</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>A >= <input type="text" v-model="quietMobileRules.quiet_time"></li>-->
        <!--<li><input type="text" v-model="quietMobileRules.score"></li>-->
        <!--<li>-->
        <!--<el-checkbox @change="handleChecked8" v-model="isPass8" label="Pass项" border></el-checkbox>-->
        <!--</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>A = {{quietMobileRules1.remark}}</li>-->
        <!--<li><input type="text" v-model="quietMobileRules1.score"></li>-->
        <!--<li></li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--</div>-->
        <!--8-->
        <div class="netin-time">
          <header class="form_header1">六、紧急联系人主被叫通话次数(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li class="title-text">
                <p>有效时时间 > = <input type="text" v-model.number="linkman_contact_count.call_time">(秒)</p>
                <p>催收机构数量 = B</p>
              </li>
              <li>本项分数</li>
              <li>是否PASS</li>
            </ul>
            <ul>
              <li class="title-text-a">
                <p>联系人A的通话次数 = A</p>
                <p>联系人B的通话次数 = B</p>
              </li>
              <li>(A+B) * <input type="text" v-model.number="linkman_contact_count.score_rate"></li>
              <li></li>
            </ul>
          </div>
          <div class="remark-box">
            <p class="remark-p">通话次数每增加1次，本项分数增加{{linkman_contact_count.score_rate}}分</p>
            <p>超过100分按100分算</p>
          </div>
        </div>
        <!--9-->
        <div class="netin-time">
          <header class="form_header1">七、每月话费金额(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li class="title-text">附加条件</li>
              <li>账单中月最低消费金额 = A(元)</li>
              <li>本项分数: Z = <input type="text" v-model.number="month_fee.score_rate"></li>
              <li>是否PASS</li>
            </ul>
            <ul>
              <li class="title-text-a">
                <p>账单中有为0的账单,</p>
                <p>且全部账单金额 < = 0</p>
              </li>
              <li>入网时间B(月)B > = <input type="text" v-model.number="month_fee.pass_month"></li>
              <li><input type="text" v-model.number="month_fee.pass_score"></li>
              <li></li>
            </ul>
            <ul>
              <li class="title-text-a">
                <p>账单中有为0的账单,</p>
                <p>且全部账单金额 < = 0</p>
              </li>
              <li>入网时间B(月)B > = 其他月数</li>
              <li><input type="text" v-model.number="month_fee.not_pass_score"></li>
              <li>
                <el-checkbox @change="handleChecked9" v-model="isPass9" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <ul>
              <li>其他条件</li>
              <li>A < <input type="text" v-model.number="month_fee.pass_money"></li>
              <li>A * Z</li>
              <li>
                <el-checkbox @change="handleChecked10" v-model="isPass10" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <ul>
              <li>其他条件</li>
              <li>A = 其他金额</li>
              <li>A * Z</li>
              <li></li>
            </ul>
          </div>
          <div class="remark-box">
            <p class="remark-p">月最低消费金额每增加一元，本项分数增加{{month_fee.score_rate}}分</p>
            <p>超过100分按100分算</p>
          </div>
        </div>
        <!--10-->
        <div class="netin-time">
          <header class="form_header1">八、主叫，被叫通话次数(总分100)</header>
          <div class="netin-time-table">
            <ul class="title-table">
              <li class="title-text">
                <p>入网时间 = A(月)</p>
                <p>通话次数 = B(次)</p>
                <p>有效通话时间>=<input type="text" v-model.number="contact_count.call_time">(秒)</p>
              </li>
              <li>本项分数 :Z = <input type="text" v-model.number="contact_count.score_rate"></li>
              <li>是否PASS</li>
            </ul>
            <ul>
              <li>A > = 18，B < <input type="text" v-model.number="contact_count.little_count"></li>
              <li>(B/10) * Z</li>
              <li>
                <el-checkbox @change="handleChecked11" v-model="isPass11" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <ul>
              <li>A > = 18，B > {{contact_count.little_count}}</li>
              <li>(B/10) * Z</li>
              <li></li>
            </ul>
            <ul>
              <li>A < 18，B < <input type="text" v-model.number="contact_count.large_count"></li>
              <li>(B/10) * Z</li>
              <li>
                <el-checkbox @change="handleChecked12" v-model="isPass12" label="Pass项" border></el-checkbox>
              </li>
            </ul>
            <ul>
              <li>A < 18，B > {{contact_count.large_count}}</li>
              <li>(B/10) * Z</li>
              <li></li>
            </ul>
          </div>
          <div class="remark-box">
            <p class="remark-p">主被叫通话次数每增加10次，本项分数增加{{contact_count.score_rate}}分</p>
            <p>备注：超过100分按100分算</p>
          </div>
        </div>
        <div class="netin-time">
          <header class="form_header1">手机运营商评分卡权重</header>
          <div class="netin-time-table">
            <div class="phone-weight">
              <div class="box-pw">
                <p>入网时间：</p>
                <input type="text" v-model.number="sum">%
              </div>
              <div class="box-pw">
                <p>账户状态：</p>
                <input type="text" v-model.number="sum1">%
              </div>
            </div>
            <div class="phone-weight">
              <div class="box-pw">
                <p>特殊电话：</p>
                <input type="text" v-model.number="sum2">%
              </div>
              <div class="box-pw">
                <p>账单数量：</p>
                <input type="text" v-model.number="sum3">%
              </div>
              <div class="box-pw">
                <p>月话费金额：</p>
                <input type="text" v-model.number="sum4">%
              </div>
            </div>

            <div class="phone-weight">
              <div class="box-pw">
                <p>互通电话个数：</p>
                <input type="text" v-model.number="sum5">%
              </div>
              <div class="box-pw">
                <p>主叫被叫通话次数：</p>
                <input type="text" v-model.number="sum6">%
              </div>
              <div class="box-pw">
                <p>紧急联系人主叫被叫通话次数：</p>
                <input type="text" v-model.number="sum7">%
              </div>
            </div>
            <!-- <div class="phone-weight">
              <div class="box-pw">
                <p>手机静默使用情况：</p>
                <input type="text" v-model="sum8">%
              </div>

            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="totalWeight">当前总权重比例为<span class="scaleColor">{{sumA}}</span>%，达到100%才能保存</div>
    <div>
      <el-button size="small" class="saveBtn" type="primary" @click.native="SubmitSave">
        {{btnEditText}}
      </el-button>
    </div>
  </div>
</template>
<script>
  import Api from "@/api";
  import sessionStorage from "@/storage/sessionStorage";

  export default {
    data() {
      return {
        btnEditText: "提交",
        isPass1: false,
        isPass2: false,
        isPass3: false,
        isPass4: false,
        isPass5: false,
        isPass6: false,
        isPass7: false,
        isPass8: false,
        isPass9: false,
        isPass10: false,
        isPass11: false,
        isPass12: false,
        sum: 0,
        sum1: 0,
        sum2: 0,
        sum3: 0,
        sum4: 0,
        sum5: 0,
        sum6: 0,
        sum7: 0,
        sum8: 0,
        sum9: 0,
        reg_time: {}, // 入网时间1
        mutual_contact_count: {}, // 互通电话号码
        bill_count: {}, // 账单数量1
        // finance_contact: {}, // 金融机构通话数量
        mobile_status: {}, // 账户状态
        special_mobile: {}, // 特殊电话
        quiet_mobile: {}, // 手机静默使用天数
        linkman_contact_count: {}, // 紧急联系人主被叫通话次数
        month_fee: {}, //每月话费金额
        contact_count: {}, // 主叫，被叫通话次数
        mobile_weight: {}, // 手机运营商评分卡权重
      };
    },
    mounted() {
      this.getDetailModule();
    },
    computed: {
      sumA: function () {
        return (
          parseInt(this.sum ? this.sum : 0) +
          parseInt(this.sum1 ? this.sum1 : 0) +
          parseInt(this.sum2 ? this.sum2 : 0) +
          parseInt(this.sum3 ? this.sum3 : 0) +
          parseInt(this.sum4 ? this.sum4 : 0) +
          parseInt(this.sum5 ? this.sum5 : 0) +
          parseInt(this.sum6 ? this.sum6 : 0) +
          parseInt(this.sum7 ? this.sum7 : 0)
          // parseInt(this.sum9 ? this.sum9 : 0)
          // parseInt(this.sum8 ? this.sum8 : 0) +
        );
      }
    },
    methods: {
      getDetailModule() {
        let para = {
          shopId: sessionStorage.$getSessionStorageByName("shopId"),
          moduleName: "creditMobileMhService"
        };

        Api.testApi.getDetailModule(para).then(res => {
          if (res.code == "0000") {
            let resRules = JSON.parse(res.data);
            console.log('res', resRules)
            //入网时间
            this.reg_time = resRules.reg_time;
            this.isPass1 = this.reg_time.pass_status == 1 ? true : false;
            //互通电话号码
            this.mutual_contact_count = resRules.mutual_contact_count

            this.isPass2 = this.mutual_contact_count.pass_status == 1 ? true : false;
            //账单数量
            this.bill_count = resRules.bill_count;
            this.isPass3 = this.bill_count.pass_status == 1 ? true : false;
            //账户状态
            this.mobile_status = resRules.mobile_status;
            this.isPass6 =
              this.mobile_status.pass_status == 1 ? true : false;
            //特殊电话
            this.special_mobile = resRules.special_mobile;
            this.isPass7 = this.special_mobile.pass_status == 1 ? true : false;
            //手机静默使用天数quiet_mobile
            this.quiet_mobile = resRules.quiet_mobile;
            // this.quietMobileRules = this.mobileData.quiet_mobile.rules[0];
            // this.quietMobileRules1 = this.mobileData.quiet_mobile.rules[1];
            // this.isPass8 = this.mobileData.quiet_mobile.rules[0].pass_status == 1 ? true : false;
            //紧急联系人主被叫通话次数
            this.linkman_contact_count = resRules.linkman_contact_count;
            //每月话费金额
            this.month_fee = resRules.month_fee;
            this.isPass9 = this.month_fee.money_pass_status == 1 ? true : false;
            this.isPass10 = this.month_fee.month_pass_status == 1 ? true : false;
            //主叫，被叫通话次数
            this.contact_count = resRules.contact_count;
            this.isPass11 =
              this.contact_count.little_pass_status == 1 ? true : false;
            this.isPass12 =
              this.contact_count.large_pass_status == 1 ? true : false;
            // 手机运营商评分卡权重
            this.mobile_weight = resRules.mobile_weight;

            this.sum = parseInt(this.mobile_weight.reg_time);
            this.sum1 = parseInt(this.mobile_weight.mutual_contact_count);
            this.sum2 = parseInt(this.mobile_weight.bill_count);
            this.sum3 = parseInt(this.mobile_weight.mobile_status);
            this.sum4 = parseInt(this.mobile_weight.special_mobile);
            this.sum5 = parseInt(this.mobile_weight.linkman_contact_count);
            this.sum6 = parseInt(this.mobile_weight.month_fee);
            this.sum7 = parseInt(this.mobile_weight.contact_count);
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      SubmitSave() {
        var _this = this;
        //        console.log('11--------------------', this.mobileData.mobile_weight)
        //        console.log('全部', this.mobileData)
        this.mobile_weight.reg_time = this.sum;
        this.mobile_weight.mutual_contact_count = this.sum1;
        this.mobile_weight.bill_count = this.sum2;
        this.mobile_weight.mobile_status = this.sum3;
        this.mobile_weight.special_mobile = this.sum4;
        this.mobile_weight.linkman_contact_count = this.sum5;
        this.mobile_weight.month_fee = this.sum6;
        this.mobile_weight.contact_count = this.sum7;
        let mobileData = {
          reg_time: this.reg_time,
          mutual_contact_count: this.mutual_contact_count,
          bill_count: this.bill_count,
          mobile_status: this.mobile_status,
          special_mobile: this.special_mobile,
          linkman_contact_count: this.linkman_contact_count,
          month_fee: this.month_fee,
          contact_count: this.contact_count,
          mobile_weight: this.mobile_weight,
          quiet_mobile:this.quiet_mobile
        }
        if (this.sumA != 100) {
          this.$message({
            message: "总权重比例需达到100%才能保存,请重新配制",
            type: "warning"
          });
        } else {
          _this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let para = {
              moduleName: "creditMobileMhService",
              shopId: sessionStorage.$getSessionStorageByName("shopId"),
              cfInfo: JSON.stringify(mobileData)
            };
            Api.testApi.changeDetailModule(para).then(res => {
              if (res.code == "0000") {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.getDetailModule();
              } else {
                this.$message.error(res.msg);
              }
            });
          });
        }
      },

      //Pass项-----------
      //1111
      handleChecked1(val) {
        console.log(val);
        this.reg_time.pass_status= val ? 1 : 0; //0 非PASS  1PASS
      },
      //2222
      handleChecked2(val) {
        console.log(val);
        this.mutual_contact_count.pass_status = val ? 1 : 0; //0 非PASS  1PASS
        //        console.log('val1', this.mobileData.tel_count.rules[0].pass_status)
      },
      //3333
      handleChecked3(val) {
        console.log(val);
        this.bill_count.pass_status = val ? 1 : 0; //0 非PASS  1PASS
        //        console.log('val1', this.mobileData.bill_count.rules[0].pass_status)
      },
      //4444
      handleChecked4(val) {
        console.log(val);
        this.mobileData.finance_contact.rules[0].pass_status = val ? 1 : 0; //0 非PASS  1PASS
        //        console.log('val1', this.mobileData.finance_contact.rules[0].pass_status)
      },
      handleChecked5(val) {
        console.log(val);
        this.mobileData.finance_contact.rules[1].pass_status = val ? 1 : 0; //0 非PASS  1PASS
        //        console.log('val1', this.mobileData.finance_contact.rules[1].pass_status)
      },
      //5555
      handleChecked6(val) {
        console.log(val);
        this.mobile_status.pass_status = val ? 1 : 0; //0 非PASS  1PASS
        //        console.log('val1', this.mobileData.mobile_account.rules[0].pass_status)
      },
      //6666
      handleChecked7(val) {
        console.log(val);
        this.special_mobile.pass_status = val ? 1 : 0; //0 非PASS  1PASS
        //        console.log('val1', this.mobileData.special_mobile.rules[0].pass_status)
      },
      //7777
      handleChecked8(val) {
        console.log(val);
        // this.mobileData.quiet_mobile.rules[0].pass_status = val ? 1 : 0; //0 非PASS  1PASS
        //        console.log('val1', this.mobileData.quiet_mobile.rules[0].pass_status)
      },
      //9999
      handleChecked9(val) {
        console.log(val);
        this.month_fee.money_pass_status = val ? 1 : 0; //0 非PASS  1PASS
        //        console.log('val1', this.mobileData.evMonth_fee.rules[1].pass_status)
      },
      handleChecked10(val) {
        console.log(val);
        this.month_fee.month_pass_status = val ? 1 : 0; //0 非PASS  1PASS
        //        console.log('val1', this.mobileData.evMonth_fee.rules[2].pass_status)
      },
      //10
      handleChecked11(val) {
        console.log(val);
        this.contact_count.little_pass_status = val ? 1 : 0; //0 非PASS  1PASS
        //        console.log('val1', this.mobileData.active_tel.rules[0].pass_status)
      },
      handleChecked12(val) {
        console.log(val);
        this.contact_count.large_pass_status = val ? 1 : 0; //0 非PASS  1PASS
        //        console.log('val1', this.mobileData.active_tel.rules[2].pass_status)
      }
    }
  };
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

  .totalWeight {
    height: 50px;
    line-height: 50px;
  }

  .scaleColor {
    color: orangered;
  }
</style>
