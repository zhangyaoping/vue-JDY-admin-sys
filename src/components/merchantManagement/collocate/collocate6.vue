<template>
  <div class="content-box">
    <el-row>
      <el-col :span="14" :offset="4">
        <el-form :label-position="labelPosition" :model="formData" :rules="foodrules" ref="formData" label-width="140px"
                 class="form food_form">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="最低额度" prop="bank_card_name">
                <el-input v-model="formData.minAmount"></el-input>
              </el-form-item>
              <el-form-item label="最高额度" prop="bank_card">
                <el-input v-model="formData.maxAmount"></el-input>
              </el-form-item>
              <el-form-item label="默认额度" prop="bank_card">
                <el-input v-model="formData.defaultAmount"></el-input>
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
          minAmount: '',
          maxAmount: '',
          defaultAmount: ''
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
            if (res.data.configAmountInfo) {
              this.formData = JSON.parse(res.data.configAmountInfo);
            }
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
              let para = Object.assign({}, _this.formData);
              para.shopId = sessionStorage.$getSessionStorageByName("shopId")// 商户编号
              Api.testApi.amountInfo(para).then(res => {
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
