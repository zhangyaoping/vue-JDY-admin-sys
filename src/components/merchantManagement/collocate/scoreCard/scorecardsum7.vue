<template>
  <div>
    <p class="title-header">总评分卡</p>
    <div class="content-phonecard-box">
      <div class="phonecard-box">
        <el-row class="netin-time" :gutter="20">
          <template v-for="item in sumGradeData">
            <el-col class="netin-time-table" :span="12">
              <div class="box-pw">
                <p>{{item.title}}</p>
                <input type="number" v-model.number="item.weight">%
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
      <div class="totalWeight">当前总权重比例为{{sumA}}%，达到100%才能保存</div>
      <div>
        <el-button size="small" class="saveBtn" type="primary" @click.native="SubmitSave">
          {{btnEditText}}
        </el-button>
      </div>
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
      sumGradeData: []
    };
  },
  mounted() {
    this.getDetailModule();
  },
  computed: {
    sumA: function() {
      let totalWeight = 0;
      if (this.sumGradeData) {
        for (let i = 0; i < this.sumGradeData.length; i++) {
          totalWeight =
            totalWeight +
            parseInt(
              this.sumGradeData[i].weight ? this.sumGradeData[i].weight : 0
            );
        }
        return totalWeight;
      }
    }
  },
  methods: {
    getDetailModule() {
      this.totalWeight = 0;
      let para = {
        shopId: sessionStorage.$getSessionStorageByName("shopId"),
        moduleName: "creditFlowModules"
      };


      Api.testApi.getDetailModule(para).then(res => {
        if (res.code == "0000") {
          this.sumGradeData = JSON.parse(res.data);
          //            for (let i = 0; i < this.sumGradeData.length; i++) {
          //              this.totalWeight = this.totalWeight + parseInt(this.sumGradeData[i].weight);
          //            }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    SubmitSave() {
      console.log('log',this.sumGradeData)
      var _this = this;
      if (this.sumA != 100) {
        this.$message({
          message: "总权重比例需达到100%才能保存,请重新配制",
          type: "warning"
        });
      } else {
        _this.$confirm("确认提交吗？", "提示", {}).then(() => {

          let para = {
            moduleName: "creditFlowModules",
            shopId: sessionStorage.$getSessionStorageByName("shopId"),
            cfInfo: JSON.stringify(this.sumGradeData)
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
      margin-right: 0 !important;
      margin-left: 10px !important;
      margin-bottom: 10px;
      border: 1px solid #e5e5e5;
      .form_header1 {
        border: 1px solid #e5e5e5;
        padding: 15px 0;
      }
      .netin-time-table {
        text-align: center;
        padding: 0 !important;
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
        .phone-weight {
          display: flex;
        }
      }
    }
  }
}

.totalWeight {
  height: 45px;
  line-height: 45px;
  color: orangered;
}
</style>
