<template>
  <div class="content-box">
    <el-row>
      <el-col :span="14" :offset="4">
        <el-form :label-position="labelPosition" :model="formData" :rules="foodrules" ref="formData" label-width="140px"
                 class="form food_form">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="阿里短信" prop="sms_ali_charge">
                <el-input v-model.number="formData.sms_ali_charge"></el-input>
              </el-form-item>
              <el-form-item label="百度OCR" prop="baidu_ocr_charge">
                <el-input v-model.number="formData.baidu_ocr_charge"></el-input>
              </el-form-item>
              <el-form-item label="JDB" prop="jiedaibao_charge">
                <el-input v-model.number="formData.jiedaibao_charge"></el-input>
              </el-form-item>
              <el-form-item label="JJD" prop="jinjiedao_charge">
                <el-input v-model="formData.jinjiedao_charge"></el-input>
              </el-form-item>
              <el-form-item label="同盾" prop="tb_blacklist_charge">
                <el-input v-model.number="formData.tb_blacklist_charge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电商" prop="taobao_charge">
                <el-input v-model.number="formData.taobao_charge"></el-input>
              </el-form-item>
              <el-form-item label="创蓝" prop="sms_chuanglan_chare">
                <el-input v-model.number="formData.sms_chuanglan_chare"></el-input>
              </el-form-item>
              <el-form-item label="诺尔" prop="sms_nuoer_charge">
                <el-input v-model.number="formData.sms_nuoer_charge"></el-input>
              </el-form-item>
              <el-form-item label="平台推广" prop="platform_customer_charge">
                <el-input v-model.number="formData.platform_customer_charge"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="submit-box">
            <el-button size="small" class="saveBtn" type="primary" @click.native.prevent="editSubmit">{{btnEditText}}
            </el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import sessionStorage from "@/storage/sessionStorage";
  import Api from "@/api";
  import proConfig from '@/config';

  export default {
    data() {
      return {
        labelPosition: "top",
        btnEditText: "提交",
        formData: {
          sms_ali_charge:null,
          baidu_ocr_charge:null,
          jiedaibao_charge:null,
          jinjiedao_charge:null,
          tb_blacklist_charge:null,
          taobao_charge:null,
          sms_chuanglan_chare:null,
          sms_nuoer_charge:null,
          platform_customer_charge:null
        },
        foodrules: {}
      };
    },
    components: {},

    methods: {
      //获取配制信息
      getModulesInfo() {
        let para = {
          shopId: sessionStorage.$getSessionStorageByName("shopId")
        };
        Api.testApi.getModulesInfo(para).then(res => {
          if (res.code == "0000") {
            this.formData=JSON.parse(res.data.thirdChargeInfo)
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      //提交保存配制
      editSubmit() {
        var _this = this;
        _this.$refs.formData.validate(valid => {
          if (valid) {
            _this.$confirm("确认提交吗？", "提示", {}).then(() => {
              this.editLoading = true;
            let para = {
              configInfo:JSON.stringify(Object.assign({}, _this.formData))
            }
            para.shopId = sessionStorage.$getSessionStorageByName("shopId")// 商户编号
            Api.testApi.chargeInfo(para).then(res => {
              if (res.code == "0000") {
              this.editLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.getModulesInfo();
              this.editFormVisible = false;
            } else {
              this.$message.error(res.msg);
            }
          });
          });
          }
        });
      }
    },
    created() {
      this.getModulesInfo();
    }
  };
</script>

<style lang="scss" type="text/scss" scoped>
  .button_submit {
    text-align: center;
  }

  .uploading-a {
    display: flex;
    justify-content: space-between;
  }

  .content-box {
    border: 1px solid #e5e5e5;
    padding: 15px 0;
  }

  .form_header {
    text-align: center;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-form--label-top .el-form-item__label {
    padding: 0;
  }

  .el-upload--picture-card img {
    width: 100%;
    height: 100%;
  }
</style>
