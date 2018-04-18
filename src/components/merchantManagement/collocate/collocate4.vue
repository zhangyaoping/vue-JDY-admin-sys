<template>
  <div class="content-confect">
    <div class="content-4">
      <div class="waiting-box">
        <div class="waiting">待选评分卡</div>
        <ul>
          <li v-for="allModules in formDataA">
            <el-tag size="medium" type="success">{{allModules.title}}</el-tag>
            <i class="selectAll iconfont icon-xiangyou" @click="addScorecard(allModules)"></i>
          </li>
        </ul>
      </div>
      <div class="xuanzhe"></div>
      <div class="selected-box">
        <div class="waiting">已选评分卡<span></span></div>
        <ul>
          <li v-for="chooseModules in formDataB">
            <el-tag size="medium" type="success">{{chooseModules.title}}</el-tag>
            <i class="dellChoose iconfont icon-shanchu" @click="delScorecard(chooseModules)"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="submit-box">
      <el-button size="small" class="saveBtn" type="primary" @click.native="SubmitSave">
        {{btnEditText}}
      </el-button>
    </div>

  </div>
</template>

<script>
  import Api from '@/api'
  import sessionStorage from '@/storage/sessionStorage'

  export default {
    data() {
      return {
        btnEditText: '提交',
        formDataA: [],
        formDataB: [],
      }
    },
    created() {
      this.riskDeployList()
    },
    methods: {
      riskDeployList() {
        let para = {
          shopId: sessionStorage.$getSessionStorageByName('shopId')
        }

        Api.testApi.getRiskModules(para).then(res => {
          if (res.code == '0000') {
            if (res.data.allModules) {
              let resAll = JSON.parse(res.data.allModules)
              for (let i = 0; i < resAll.length; i++) {
                if (resAll[i].is_null == 1 || resAll[i].is_null == 2) {
                  this.formDataA.push(resAll[i])
                }
                // this.formDataA.push(resAll[i])
              }
            }
            if (res.data.chooseModules) {
              let resChoose = JSON.parse(res.data.chooseModules)
              for (let i = 0; i < resChoose.length; i++) {
                if (resChoose[i].is_null == 1 || resChoose[i].is_null == 2) {
                  this.formDataB.push(resChoose[i])
                }
              }
            }
          } else {
            this.$message.error(res.msg);
          }

        })
      },

      addScorecard(data) {
        let isHave = false;
        //判断是否这个评分卡已经存在
        for (let i = 0; i < this.formDataB.length; i++) {
          if (this.formDataB[i].module == data.module) {
            isHave = true; //存在
          }
        }
        //根据isHave的值判断订单列表中是否已经有此商品
        if (isHave) {
          //存在就进行数量添加
          this.$message({
            message: '该评分卡已存在',
            type: 'warning'
          });
        } else {
          //不存在就推入数组
          let newDatas = {
            is_null: data.is_null,
            module: data.module,
            weight: data.weight,
            index: data.index,
            title: data.title
          };
          this.formDataB.push(newDatas);
        }
      },
      //前端删除单个评分卡
      delScorecard(data) {
        this.formDataB = this.formDataB.filter(o => o.module != data.module);
      },
      //提交保存
      SubmitSave() {
        var _this = this;
        _this.$confirm('确认提交保存吗？', '提示', {}).then(() => {
          this.editLoading = true;
          let para = {
            shopId: sessionStorage.$getSessionStorageByName('shopId'),
            moduleInfo: JSON.stringify(this.formDataB)
          }

          Api.testApi.primaryRiskModules(para).then(res => {
            if (res.code == '0000') {
              this.editLoading = false;
              this.$message({
                message: '保存成功',
                type: 'success'
              });

              this.formDataA = []
              this.formDataB = []
              this.riskDeployList()
            } else {
              this.$message.error(res.msg);
            }
          });
        });
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .waiting-box, .selected-box {
    border: 1px solid #e5e5e5;
    padding: 20px;
  }

  .content-confect {
    border: 1px solid #e5e5e5;
    text-align: center;
    padding: 50px 0;
  }

  .content-4 {
    display: flex;
    justify-content: center;
  }

  .waiting {
    padding-bottom: 15px;
  }

  .selectAll, .dellChoose {
    float: right;
    padding-top: 4px;
    cursor: pointer;
    font-size: 20px;
  }

  .xuanzhe {
    display: flex;
    align-items: center;
    width: 50px;
  }

  .content-4 ul {
    display: flex;
    width: 400px;
    flex-direction: column;
  }

  .content-4 ul li {
    list-style: none;
    border: 1px solid #E5E9F2;
    padding: 10px;
    margin: 5px;
    background-color: #fff;
  }
</style>
