<template>
  <div class="content-box">
    <el-row>
      <el-col :span="14" :offset="4">
        <el-form :model="formData" :label-position="labelPosition" :rules="foodrules" ref="formData" label-width="140px"
                 class="form food_form">
          <header class="form_header">{{formData.due_time}}天的费用</header>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="利息费(%)" prop="interest_rate">
                <el-input v-model.number="formData.interest_rate"></el-input>
              </el-form-item>
              <el-form-item label="快速信审费(%)" prop="audit_rate">
                <el-input v-model.number="formData.audit_rate"></el-input>
              </el-form-item>
              <el-form-item label="账户管理费(%)" prop="manage_rate">
                <el-input v-model.number="formData.manage_rate"></el-input>
              </el-form-item>
              <el-form-item label="逾期费用(%)" prop="latefee_rate">
                <el-input v-model.number="formData.latefee_rate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="初始信用额度(元)" prop="primary_amount">
                <el-input v-model.number="formData.primary_amount"></el-input>
              </el-form-item>
              <el-form-item label="最高信用额度(元)" prop="top_amount">
                <el-input v-model.number="formData.top_amount"></el-input>
              </el-form-item>
              <el-form-item label="提额条件(逾期天数)(天)" prop="improve_limit">
                <el-input v-model.number="formData.improve_limit"></el-input>
              </el-form-item>
              <el-form-item label="额度梯度(元)" prop="improve_amount">
                <el-input v-model.number="formData.improve_amount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="借款期限">
            <el-radio border class="radio" v-model="formData.due_time" label="7">7天</el-radio>
            <el-radio border class="radio" v-model="formData.due_time" label="15">15天</el-radio>
            <el-radio border class="radio" v-model="formData.due_time" label="21">21天</el-radio>
            <el-radio border class="radio" v-model="formData.due_time" label="30">30天</el-radio>
            <el-radio border class="radio" v-model="formData.due_time" label="60">60天</el-radio>
          </el-form-item>

          <el-form-item label="最低借款(元)" prop="loan_amount_limit">
            <el-input v-model.number="formData.loan_amount_limit"></el-input>
          </el-form-item>
          <div class="submit-box">
            <el-button size="small" class="saveBtn" type="primary" @click.native="editSubmit('formData')">
              {{btnEditText}}
            </el-button>
          </div>
        </el-form>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import sessionStorage from '@/storage/sessionStorage'
  import Api from '@/api'
  export default {
    data(){
      return {
        labelPosition: 'top',
        btnEditText: '提交',
        formData: {
          interest_scale: '',   //利息占比：去除%
          audit_rate: '',      //审核费占比
          manage_rate: '',     //管理费占比
          latefee_rate: '',    //逾期费占比
          due_time: '15',         //借款天数1
          primary_amount: '',//初始额度
          top_amount: '',    // 最高额度1
          improve_limit: '',    //提额限制，如：-2，逾期两天内可以提额
          improve_amount: '', //提额金额
          loan_amount_limit: '' // 最小借款额度限制
        },
        foodrules: {
//          name: [
//            {required: true, message: '请输入', trigger: 'blur'},
//          ],
        },
      }
    },
    components: {},
    created() {
      this.getModulesInfo();
    },
    methods: {
      //获取配制信息
      getModulesInfo() {
        let para = {
          shopId: sessionStorage.$getSessionStorageByName('shopId')
        }

        Api.testApi.getModulesInfo(para).then(res => {
          if (res.code == '0000') {
            if (res.data.orderLoanInfo) {
              let orderLoanInfo = JSON.parse(res.data.orderLoanInfo);
              this.formData = orderLoanInfo;
              this.formData.due_time = orderLoanInfo.due_time.toString()
            }
          } else {
            this.$message.error(res.msg);
          }

        })
      },
      //提交保存配制
      editSubmit() {
        var _this = this;
        _this.$refs.formData.validate((valid) => {
          if (valid) {
            _this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              let para = Object.assign({}, _this.formData);
             para.due_time=Number(para.due_time)
              console.log(para)
              para.shopId = sessionStorage.$getSessionStorageByName('shopId'),// 商户编号

              Api.testApi.productInfo(para).then(res => {
                if (res.code == '0000') {
                  this.editLoading = false;
//                  console.log('res-----------------------', res)
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.getModulesInfo()
                  this.editFormVisible = false;
                } else {
                  this.$message.error(res.msg);
                }

              });
            });
          }
        });


      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .form_header {
    text-align: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 15px;
    font-size: 20px;
    font-size: 20px;
  }

  .content-box {
    border: 1px solid #e5e5e5;
    padding: 50px 0;
  }

  .category_select {
    border: 1px solid #eaeefb;
    padding: 10px 30px 10px 10px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  .add_category_row {
    height: 0;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
  }

  .showEdit {
    height: 185px;
  }

  .add_category {
    background: #f9fafc;
    padding: 10px 30px 0px 10px;
    border: 1px solid #eaeefb;
    border-top: none;
  }

  .el-form-item__content {
    display: flex;
  }

  .add_category_button {
    text-align: center;
    line-height: 40px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border: 1px solid #eaeefb;
    border-top: none;
    transition: all 400ms;

    & :hover {
      background: #f9fafc;

      span, .edit_icon {
        color: #20a0ff;
      }

    }
    span {
      transition: all 400ms;
    }

    .edit_icon {
      color: #ccc;
      transition: all 400ms;
    }

  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }

  .cell {
    text-align: center;
  }
</style>
