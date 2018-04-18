<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>审核管理</el-breadcrumb-item>
        <el-breadcrumb-item>商户充值审核</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <div class="filter-container">
        <el-input clearable @keyup.enter.native="handleFilter" v-model="search.shopId" style="width: 200px;"
                  class="filter-item"
                  placeholder="商家编号">
        </el-input>
        <el-input clearable @keyup.enter.native="handleFilter" v-model="search.shopName" style="width: 200px;"
                  class="filter-item"
                  placeholder="商家名称">
        </el-input>

        <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="审核状态">
          <el-option v-for="item in platformName" :key="item.key" :label="item.status"
                     :value="item.key">
          </el-option>
        </el-select>
        <el-button @click.stop="on_refresh" class="filter-item" size="small" style="font-size: 16px;" plain v-waves
                   icon="el-icon-refresh"></el-button>
        <el-button class="filter-item" style="width: 90px;" type="primary" v-waves icon="el-icon-search"
                   @click="handleFilter">
          搜索
        </el-button>
      </div>

      <!--列表-->
      <el-table :data="userAuditlist" border highlight-current-row element-loading-text="拼命加载中" v-loading="listLoading"
                style="width: 100%;">
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="shopId" label="商户编号"></el-table-column>
        <el-table-column prop="shopName" label="商家名称"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="type" label="业务类型"></el-table-column>
        <el-table-column prop="createTime" label="申请时间"></el-table-column>
        <el-table-column prop="tradeAmount" label="充值金额"></el-table-column>
        <el-table-column prop="accountAmount" label="可用余额"></el-table-column>
        <el-table-column prop="sysUserName" label="审核人员"></el-table-column>
        <el-table-column prop="orderId" label="支付流水号"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="returnTagType(scope.row.status)"
              close-transition>{{returnTagValue(scope.row.status)}}
            </el-tag>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="操作类型" width="240">
          <template slot-scope="scope">
            <el-button :disabled="isBtnTg(scope.row)" size="small" type="primary"
                       @click="getThrough(scope.row)">通过
            </el-button>
            <el-button :disabled="isBtnTg(scope.row)" size="small" type="danger" @click="reject(scope.row)">拒绝
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar pad-a">
        <!--分页-->
        <div v-show="userAuditlist.lenght" style="float: right" class="pagination-container">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="listQuery.limit"
            :page-size="listQuery.page"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
  import util from "../../common/util";
  import waves from "@/common/waves/index.js"; // 水波纹指令
  import Api from "@/api";

  const platformName = [
    {key: "0", status: "待审核"},
    {key: "1", status: "已通过"},
    {key: "2", status: "已拒绝"}
  ];

  // arr to obj
  const platformNameKeyValue = platformName.reduce((acc, cur) => {
    acc[cur.key] = cur.status;
    return acc;
  }, {});
  export default {
    directives: {
      waves
    },
    data() {
      return {
        search: {
          shopId: "",
          shopName: ""
        },
        userAuditlist: [],
        platformName,
        total: 0,
        listQuery: {
          page: 10,
          limit: 1,
          type: undefined,
          shopId: "",
          productName: "",
          startTime: "",
          endTime: ""
        },
        listLoading: false
      };
    },
    filters: {
      typeFilter(type) {
        return platformNameKeyValue[type];
      }
    },
    created() {
      this.queryCostDetail();
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.listQuery.limit = val;
        this.queryProductList();
      },
      handleFilter() {
        this.queryCostDetail();
      },
      on_refresh() {
        this.search.shopId = '';
        this.search.shopName = '';
        this.listQuery.type = ''
        this.queryCostDetail()
      },
      //获取参数列表-
      queryCostDetail() {
        let para = {
          pSize: this.listQuery.page,
          pNum: this.listQuery.limit,
          shopId: this.search.shopId,
          shopName: this.search.shopName,
          status: this.listQuery.type || ""
        };
        ;
        this.listLoading = true;
        Api.testApi.queryRechargeList(util.checkBe(para)).then(res => {
          if (res.data.orderShopEvs) {
            for (let i = 0; i < res.data.orderShopEvs.length; i++) {
              res.data.orderShopEvs[i].createTime = util.formatDate.format(
                new Date(res.data.orderShopEvs[i].createTime),
                "yyyy-MM-dd"
              );
              res.data.orderShopEvs[i].type = this.returnTypeValue(res.data.orderShopEvs[i].type);
            }
            this.total = res.data.total;
            this.userAuditlist = res.data.orderShopEvs;
            this.listLoading = false;
          }
        });
      },
      //返回表格内标签的类型
      returnTagType(status) {
        switch (status) {
          case 0:
            return "primary";
          case 1:
            return "success";
          case 2:
            return "info";
        }
      },
      //返回表格内标签的内容
      returnTagValue(status) {
        switch (status) {
          case 0:
            return "待审核";
          case 1:
            return "已通过";
          case 2:
            return "已拒绝";
        }
      },
      returnTypeValue(status) {
        switch (status) {
          case 1:
            return "CPA费用";
          case 2:
            return "充值费用";
          case 3:
            return "提现费用";
          case 4:
            return "第三方短信费用";
          case 5:
            return "第三方身份证识别费用";
          case 6:
            return "第三方手机运营商费用";
          case 7:
            return "第三方芝麻信用";
        }
      },
      //操作按钮是否可以点击
      isBtnTg(row) {
        return row.status == 0 ? false : true;
      },
      //通过
      getThrough(row) {
        this.$prompt("此操作将审核成功", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(({value}) => {
            let para = {
              orderId: row.orderId,
              shopId: row.shopId,
              orderInfo: value || "资金符合",
              type: 2,
              status: 1
            };
            ;
            Api.testApi.changeAuditInfo(para).then(res => {
              this.queryCostDetail();
              if (res.code == "0000") {
                this.$message({
                  message: "操作成功!",
                  type: "success"
                });
                this.queryCostDetail();
              } else {
                this.$message({
                  message: "操作失败!",
                  type: "error"
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      },
      //拒绝
      reject(row) {
        this.$prompt("驳回的原因", "审核失败", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(({value}) => {
            if (value == null) {
              this.$message({
                message: "请说明原因!",
                type: "warning"
              });
            } else {
              let para = {
                orderId: row.orderId,
                shopId: row.shopId,
                orderInfo: value,
                type: 2,
                status: 2
              };
              Api.testApi.changeAuditInfo(para).then(res => {
                if (res.code == "0000") {
                  this.$message({
                    message: "操作成功!",
                    type: "success"
                  });
                  this.queryCostDetail();
                } else {
                  this.$message({
                    message: "操作失败!",
                    type: "error"
                  });
                }
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      }
    },
    components: {}
  };
</script>

<style type="text/scss" lang="scss" scoped>
  .demo-table-expand label {
    font-weight: bold;
  }

  .filter-container {
    padding: 20px 0;
  }

  .el-button {
    width: 70px;
  }
</style>
