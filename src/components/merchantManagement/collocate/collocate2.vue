<template>
  <div class="content-box">
    <el-row>
      <el-col :span="14" :offset="4">
        <el-form :label-position="labelPosition" :model="formData" :rules="foodrules" ref="formData" label-width="140px"
                 class="form food_form">
          <div class="uploading-a">
            <el-form-item label="上传支付宝收款二维码">
              <el-upload
                ref="alipay"
                class="uploading"
                :action="apiUrl"
                list-type="picture-card"
                :headers="myHeaders"
                :on-success="SuccessAlipay"
                :on-preview="handleAlipay"
                :limit="limitsImg"
                :before-upload="beforeAvatarUpload"
                :on-remove="RemoveAlipay">
                <img v-if="formData.alipay_url" :src="formData.alipay_url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible1">
                <img width="100%" :src="formData.alipay_url" alt="">
              </el-dialog>
            </el-form-item>

            <el-form-item label="上传微信收款二维码">
              <el-upload
                ref="weChat"
                class="uploading"
                :action="apiUrl"
                list-type="picture-card"
                :headers="myHeaders"
                :on-success="SuccessWeChat"
                :on-preview="handleWeChat"
                :limit="limitsImg"
                :before-upload="beforeAvatarUpload"
                :on-remove="RemoveWeChat">
                <img v-if="formData.weChat_url" :src="formData.weChat_url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible2">
                <img width="100%" :src="formData.weChat_url" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="上传银行卡照片">
              <el-upload
                ref="bankCard"
                class="uploading"
                :action="apiUrl"
                list-type="picture-card"
                :headers="myHeaders"
                :on-success="SuccessBankcard"
                :on-preview="handleBankcard"
                :limit="limitsImg"
                :before-upload="beforeAvatarUpload"
                :on-remove="RemoveBankcard">
                <img v-if="formData.bankCard_url" :src="formData.bankCard_url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible3">
                <img width="100%" :src="formData.bankCard_url" alt="">
              </el-dialog>
            </el-form-item>
          </div>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="开户人姓名" prop="bank_card_name">
                <el-input v-model="formData.bank_card_name"></el-input>
              </el-form-item>
              <el-form-item label="银行卡号" prop="bank_card">
                <el-input v-model="formData.bank_card"></el-input>
              </el-form-item>
              <el-form-item label="开户行" prop="bank_name">
                <el-input v-model="formData.bank_name"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码" prop="id_card">
                <el-input v-model="formData.id_card"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支付宝收款账户姓名" prop="alipay_account_name">
                <el-input v-model="formData.alipay_account_name"></el-input>
              </el-form-item>
              <el-form-item label="支付宝账号" prop="alipay_account">
                <el-input v-model="formData.alipay_account"></el-input>
              </el-form-item>

              <el-form-item label="微信账户收款姓名" prop="weChat_account_name">
                <el-input v-model="formData.weChat_account_name"></el-input>
              </el-form-item>

            </el-col>
          </el-row>
          <div class="submit-box">
            <el-button size="small" class="saveBtn" type="primary" @click.native.prevent="editSubmit">{{btnEditText}}</el-button>
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
        myHeaders: {
          tokenId: sessionStorage.$getSessionStorageByName("tokenId")
        }, // 要保证取到
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        limitsImg: 1,
        apiUrl: proConfig.apiUrl + '/sys/shop/uploadImg',
        labelPosition: "top",
        btnEditText: "提交",
        formData: {
          weChat_url: "", //微信二维码路径1
          alipay_url: "", //支付宝二维码路径1
          bankCard_url: "", //银行卡图片路径1
          weChat_account_name: "", //微信用户名1
          alipay_account: "", //支付宝账户1
          alipay_account_name: "", //支付宝所属人姓名1
          bank_card_name: "", //银行卡所属人姓名1
          bank_name: "", //开户行1
          bank_card: "" //银行卡号1
        },
        foodrules: {}
      };
    },
    components: {},

    methods: {
      //      上传支付宝二维码图片
      RemoveAlipay(file, fileList) {
        this.formData.alipay_url = "";
        console.log("1-------");
      },
      handleAlipay(file) {
        this.formData.alipay_url = file.url;
        this.dialogVisible1 = true;
      },
      async SuccessAlipay(response) {
        this.formData.alipay_url = await response.data;
      },
      //上传微信二维码图片
      RemoveWeChat(file, fileList) {
        this.formData.weChat_url = "";
        console.log("2-------");
      },
      handleWeChat(file) {
        this.formData.weChat_url = file.url;
        this.dialogVisible2 = true;
      },
      async SuccessWeChat(response) {
        this.formData.weChat_url = await response.data;
      },
      //上传银行卡二维码图片
      RemoveBankcard(file, fileList) {
        this.formData.bankCard_url = "";
        console.log("3-------");
      },
      handleBankcard(file) {
        this.formData.bankCard_url = file.url;
        this.dialogVisible3 = true;
      },
      async SuccessBankcard(response) {
        this.formData.bankCard_url = await response.data;
      },
      beforeAvatarUpload(file) {
        const isRightType =
          file.type === "image/jpeg" || file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isRightType) {
          this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isRightType && isLt2M;
      },

      //获取配制信息
      getModulesInfo() {
        let para = {
          shopId: sessionStorage.$getSessionStorageByName("shopId")
        };

        Api.testApi.getModulesInfo(para).then(res => {
          if (res.code == "0000") {
            if (res.data.orderRepayInfo) {
              let orderRepayInfo = JSON.parse(res.data.orderRepayInfo);
              this.formData = orderRepayInfo;
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      },

      //提交保存配制
      editSubmit() {
        var _this = this;
        //        console.log('formData', this.formData)
        _this.$refs.formData.validate(valid => {
          if (valid) {
            _this.$confirm("确认提交吗？", "提示", {}).then(() => {
              this.editLoading = true;
              let para = Object.assign({}, _this.formData);
              para.shopId = sessionStorage.$getSessionStorageByName("shopId")// 商户编号
              Api.testApi.repayInfo(para).then(res => {
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

  .uploading {
    width: 148px;
    height: 148px;
    overflow: hidden;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
</style>
